import { Injectable } from '@angular/core';
import { HeroPowerFragments } from './hero-power.fragments';
import gql from 'graphql-tag';

@Injectable()
export class HeroFragments {
    heroFragment = gql`
        fragment heroFragment on Hero {
            nodeId
            heroId
            heroName
        }
    `;

    heroWithDetailsFragment = gql`
        fragment heroWithDetailsFragment on Hero {
            ...heroFragment
            heroPowersByHero {
                nodes {
                    ...heroPowerFragment
                }
            }
        }
        ${this.heroFragment}
        ${this.heroPowerFragments.heroPowerFragment}
    `;

    heroPowerWithHeroFragment = gql`
        fragment heroPowerWithHeroFragment on HeroPower {
            nodeId
            heroPowerId
            heroByHero {
                ...heroFragment
            }
        }
        ${this.heroFragment}
    `;

    constructor(private heroPowerFragments: HeroPowerFragments) {}
}
