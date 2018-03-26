import { Power } from './power';

export interface HeroPower {
    heroPowerId: number;
    powerByPower: Power;
}

export interface HeroPowerList {
    nodes: HeroPower[];
}
