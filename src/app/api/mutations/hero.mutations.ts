import { Injectable } from '@angular/core';
import { HeroFragments } from '../fragments';
import gql from 'graphql-tag';

@Injectable()
export class HeroMutations {
    updateHeroByHeroId = gql`
        mutation updateHeroByHeroId($heroId: Int!, $heroPatch: HeroPatch!) {
            updateHeroByHeroId(
                input: { heroId: $heroId, heroPatch: $heroPatch }
            ) {
                hero {
                    ...heroWithDetailsFragment
                }
            }
        }
        ${this.heroFragments.heroWithDetailsFragment}
    `;

    constructor(private heroFragments: HeroFragments) {}
}
