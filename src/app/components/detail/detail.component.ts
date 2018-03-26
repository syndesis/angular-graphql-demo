import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HeroService, PowerService } from '../../services';
import { Hero } from '../../models/hero';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { HeroPowerService } from '../../services/hero-power.service';

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    hero$: Observable<Hero>;
    heroId: number;
    heroDetailForm: FormGroup;
    addPowerForm: FormGroup;
    subscriptions: Subscription[] = [];
    addPowerModal = false;
    updateLoading: boolean;
    updateLoaded: boolean;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private heroService: HeroService,
        private powerService: PowerService,
        private heroPowerService: HeroPowerService,
        private formBuilder: FormBuilder
    ) {
        this.heroDetailForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
        this.addPowerForm = this.formBuilder.group({
            name: ['', Validators.required]
        });
    }

    ngOnInit() {
        this.hero$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.heroId = parseInt(params.get('heroId'), 10);
                return this.heroService.getHero(this.heroId).valueChanges.pipe(
                    map(({ data }) => data.heroByHeroId),
                    tap((hero: Hero) =>
                        this.heroDetailForm.patchValue({
                            name: hero.heroName
                        })
                    )
                );
            })
        );
    }

    updateHero() {
        const name = this.heroDetailForm.controls['name'].value;
        this.updateLoading = true;
        this.updateLoaded = false;
        this.subscriptions.push(
            this.heroService
                .updateHero(this.heroId, { heroName: name })
                .subscribe(() => {
                    this.updateLoading = false;
                    this.updateLoaded = true;
                    setTimeout(() => (this.updateLoaded = false), 3000);
                })
        );
    }

    addPower() {
        const powerName = this.addPowerForm.controls['name'].value;
        this.subscriptions.push(
            this.heroPowerService
                .addHeroPower(this.heroId, powerName)
                .subscribe(() => {
                    this.addPowerForm.reset();
                    this.addPowerModal = false;
                })
        );
    }

    removePower(heroPowerId: number) {
        this.subscriptions.push(
            this.heroPowerService.deleteHeroPower(heroPowerId).subscribe()
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
