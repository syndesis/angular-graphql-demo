import { Injectable } from '@angular/core';
import { HeroFragments, PowerFragments } from '../fragments';
import gql from 'graphql-tag';

@Injectable()
export class PowerQueries {
    allPowers = gql`
        query allPowers {
            allPowers(orderBy: POWER_NAME_ASC) {
                nodes {
                    ...powerFragment
                }
            }
        }
        ${this.powerFragments.powerFragment}
    `;

    searchPowers = gql`
        query searchPowers($powerName: String!) {
            allPowers(filter: { powerName: { likeInsensitive: $powerName } }) {
                nodes {
                    heroPowersByPower {
                        nodes {
                            ...heroPowerWithHeroFragment
                        }
                    }
                }
            }
        }
        ${this.heroFragments.heroPowerWithHeroFragment}
    `;

    constructor(
        private powerFragments: PowerFragments,
        private heroFragments: HeroFragments
    ) {}
}
