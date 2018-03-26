import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable()
export class PowerFragments {
    powerFragment = gql`
        fragment powerFragment on Power {
            nodeId
            powerId
            powerName
        }
    `;
}
