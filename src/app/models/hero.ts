import { HeroPowerList } from './hero-power';
import { Profile } from './profile';

export interface Hero {
    nodeId: number;
    heroId: number;
    heroName: string;
    heroPowersByHero: HeroPowerList;
    profileByHero: Profile;
}
