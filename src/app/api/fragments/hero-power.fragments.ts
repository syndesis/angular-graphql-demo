import { Injectable } from '@angular/core';
import { PowerFragments } from './power.fragments';
import gql from 'graphql-tag';

@Injectable()
export class HeroPowerFragments {
    heroPowerFragment = gql`
        fragment heroPowerFragment on HeroPower {
            nodeId
            heroPowerId
            powerByPower {
                ...powerFragment
            }
        }
        ${this.powerFragments.powerFragment}
    `;

    constructor(private powerFragments: PowerFragments) {}
}
