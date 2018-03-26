import { Injectable } from '@angular/core';
import gql from 'graphql-tag';

@Injectable()
export class ProfileFragments {
    profileFragment = gql`
        fragment profileFragment on Profile {
            nodeId
            profileId
            hometown
            secretIdentity
        }
    `;
}
