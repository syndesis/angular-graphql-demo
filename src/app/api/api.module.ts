import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { ApiService } from './api.service';
import { GlobalAlertService } from '../services';
import { onError } from 'apollo-link-error';
import * as fromFragments from './fragments';
import * as fromQueries from './queries';
import * as fromMutations from './mutations';

@NgModule({
    imports: [CommonModule, ApolloModule, HttpLinkModule, HttpClientModule],
    declarations: [],
    providers: [
        ApiService,
        ...fromFragments.fragments,
        ...fromQueries.queries,
        ...fromMutations.mutations
    ]
})
export class ApiModule {
    constructor(
        apollo: Apollo,
        httpLink: HttpLink,
        globalAlertService: GlobalAlertService
    ) {
        const uri = environment.apiURL;
        const cache = new InMemoryCache({
            dataIdFromObject: object => object['nodeId'] || null
        });
        const errorLink = onError(({ networkError }) => {
            const networkErrorRef: HttpErrorResponse = networkError as HttpErrorResponse;
            if (networkErrorRef) {
                networkErrorRef.error.errors.forEach(error => {
                    globalAlertService.announceNetworkError(error.message);
                });
            }
        });
        apollo.create({
            link: ApolloLink.from([errorLink, httpLink.create({ uri })]),
            cache
        });
    }
}
