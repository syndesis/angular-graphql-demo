import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { HeroFragments } from '../fragments';

@Injectable()
export class HeroQueries {
    allHeroes = gql`
        query allHeroes {
            allHeroes {
                nodes {
                    ...heroFragment
                }
            }
        }
        ${this.heroFragments.heroFragment}
    `;

    topHeroes = gql`
        query topHeroes {
            allHeroes(first: 5) {
                nodes {
                    ...heroFragment
                }
            }
        }
        ${this.heroFragments.heroFragment}
    `;

    heroWithDetailsByHeroId = gql`
        query heroWithDetailsByHeroId($heroId: Int!) {
            heroByHeroId(heroId: $heroId) {
                ...heroWithDetailsFragment
            }
        }
        ${this.heroFragments.heroWithDetailsFragment}
    `;

    searchHeroes = gql`
        query searchHeroes($heroName: String!) {
            allHeroes(filter: { heroName: { likeInsensitive: $heroName } }) {
                nodes {
                    ...heroFragment
                }
            }
        }
        ${this.heroFragments.heroFragment}
    `;

    constructor(private heroFragments: HeroFragments) {}
}
