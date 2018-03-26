import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { FetchPolicy, MutationUpdaterFn } from 'apollo-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ApiService {
    constructor(private apollo: Apollo) {}

    query(
        query: string,
        variables: Object = {},
        fetchPolicy: FetchPolicy = 'cache-first'
    ): QueryRef<any> {
        return this.apollo.watchQuery({
            query,
            variables,
            fetchPolicy,
            errorPolicy: 'all'
        });
    }

    mutate(
        mutation: string,
        variables: Object = {},
        update?: MutationUpdaterFn
    ): Observable<any> {
        return this.apollo.mutate({
            mutation,
            variables,
            update,
            errorPolicy: 'all'
        });
    }
}
