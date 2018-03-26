import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { PowerQueries } from '../api/queries';
import { QueryRef } from 'apollo-angular';

@Injectable()
export class PowerService {
    constructor(
        private apiService: ApiService,
        private powerQueries: PowerQueries
    ) {}

    getPowers(): QueryRef<any> {
        return this.apiService.query(this.powerQueries.allPowers);
    }

    searchHeroPowers(powerName: string): QueryRef<any> {
        return this.apiService.query(
            this.powerQueries.searchPowers,
            {
                powerName
            },
            'network-only'
        );
    }
}
