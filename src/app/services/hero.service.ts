import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { HeroQueries } from '../api/queries';
import { QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import { HeroMutations } from '../api/mutations';

@Injectable()
export class HeroService {
    constructor(
        private apiService: ApiService,
        private heroQueries: HeroQueries,
        private heroMutations: HeroMutations
    ) {}

    getHeroes(): QueryRef<any> {
        return this.apiService.query(this.heroQueries.allHeroes);
    }

    topHeroes(): QueryRef<any> {
        return this.apiService.query(this.heroQueries.topHeroes);
    }

    getHero(heroId: number): QueryRef<any> {
        return this.apiService.query(this.heroQueries.heroWithDetailsByHeroId, {
            heroId
        });
    }

    updateHero(heroId: number, heroPatch: Object): Observable<any> {
        return this.apiService.mutate(this.heroMutations.updateHeroByHeroId, {
            heroId,
            heroPatch
        });
    }

    searchHeroes(heroName: string): QueryRef<any> {
        return this.apiService.query(this.heroQueries.searchHeroes, {
            heroName
        });
    }
}
