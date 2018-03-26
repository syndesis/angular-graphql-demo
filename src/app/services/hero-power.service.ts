import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';
import { HeroPowerMutations } from '../api/mutations';

@Injectable()
export class HeroPowerService {
    constructor(
        private apiService: ApiService,
        private heroPowerMutations: HeroPowerMutations
    ) {}

    addHeroPower(heroId: number, powerName: string): Observable<any> {
        return this.apiService.mutate(this.heroPowerMutations.addHeroPower, {
            heroId,
            powerName
        });
    }

    deleteHeroPower(heroPowerId: number): Observable<any> {
        return this.apiService.mutate(this.heroPowerMutations.deleteHeroPower, {
            heroPowerId
        });
    }
}
