import { HeroPowerList } from './hero-power';

export interface Hero {
    nodeId: number;
    heroId: number;
    heroName: string;
    heroPowersByHero: HeroPowerList;
}
