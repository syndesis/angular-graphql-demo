import { HeroService } from './hero.service';
import { GlobalAlertService } from './global-alert.service';
import { PowerService } from './power.service';

export const services: any[] = [HeroService, GlobalAlertService, PowerService];

export * from './hero.service';
export * from './global-alert.service';
export * from './power.service';
