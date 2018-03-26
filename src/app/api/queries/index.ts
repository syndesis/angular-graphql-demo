import { HeroQueries } from './hero.queries';
import { HeroPowerQueries } from './hero-power.queries';
import { ProfileQueries } from './profile.queries';
import { PowerQueries } from './power.queries';

export const queries: any[] = [
    HeroQueries,
    HeroPowerQueries,
    ProfileQueries,
    PowerQueries
];

export * from './hero.queries';
export * from './hero-power.queries';
export * from './profile.queries';
export * from './power.queries';
