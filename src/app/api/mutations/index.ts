import { HeroMutations } from './hero.mutations';
import { HeroPowerMutations } from './hero-power.mutations';

export const mutations: any[] = [HeroMutations, HeroPowerMutations];

export * from './hero.mutations';
export * from './hero-power.mutations';
