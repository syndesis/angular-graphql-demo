import { Injectable } from '@angular/core';
import { HeroFragments, HeroPowerFragments } from '../fragments';
import gql from 'graphql-tag';

@Injectable()
export class HeroPowerMutations {
    addHeroPower = gql`
        mutation addHeroPower($heroId: Int!, $powerName: String!) {
            addHeroPower(input: { heroId: $heroId, powerName: $powerName }) {
                heroByHero {
                    ...heroWithDetailsFragment
                }
                heroPower {
                    ...heroPowerFragment
                }
            }
        }
        ${this.heroFragments.heroWithDetailsFragment}
        ${this.heroPowerFragments.heroPowerFragment}
    `;

    deleteHeroPower = gql`
        mutation deleteHeroPower($heroPowerId: Int!) {
            deleteHeroPowerByHeroPowerId(input: { heroPowerId: $heroPowerId }) {
                heroByHero {
                    ...heroWithDetailsFragment
                }
            }
        }
        ${this.heroFragments.heroWithDetailsFragment}
    `;

    constructor(
        private heroFragments: HeroFragments,
        private heroPowerFragments: HeroPowerFragments
    ) {}
}
