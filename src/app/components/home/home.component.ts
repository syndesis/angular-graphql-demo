import { Component, OnInit } from '@angular/core';
import { HeroService, PowerService } from '../../services';
import { Observable } from 'rxjs/Observable';
import { Hero } from '../../models/hero';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    shareReplay,
    switchMap,
    tap
} from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QueryRef } from 'apollo-angular';

@Component({
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
    heroesQuery: QueryRef<any>;
    heroes$: Observable<Hero[]>;
    heroSearchForm: FormGroup;
    heroSearchResults$: Observable<Hero[]>;
    powerSearchForm: FormGroup;
    powerSearchResults$: Observable<Hero[]>;
    powerSearchComplete: boolean;

    constructor(
        private heroService: HeroService,
        private powerService: PowerService,
        private formBuilder: FormBuilder
    ) {
        this.heroSearchForm = this.formBuilder.group({
            search: []
        });
        this.powerSearchForm = this.formBuilder.group({
            search: []
        });
    }

    ngOnInit() {
        this.heroesQuery = this.heroService.topHeroes();
        this.heroes$ = this.heroesQuery.valueChanges.pipe(
            map(({ data }) => data.allHeroes.nodes)
        );

        this.heroSearchResults$ = this.heroSearchForm.controls[
            'search'
        ].valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            filter(search => search.length > 2),
            map(search => '%' + search + '%'),
            switchMap(search =>
                this.heroService
                    .searchHeroes(search)
                    .valueChanges.pipe(map(({ data }) => data.allHeroes.nodes))
            ),
            shareReplay()
        );

        this.powerSearchResults$ = this.powerSearchForm.controls[
            'search'
        ].valueChanges.pipe(
            tap(() => (this.powerSearchComplete = false)),
            debounceTime(500),
            distinctUntilChanged(),
            filter(search => search.length > 2),
            map(search => '%' + search + '%'),
            switchMap(search =>
                this.powerService
                    .searchHeroPowers(search)
                    .valueChanges.pipe(
                        tap(() => (this.powerSearchComplete = true)),
                        filter(({ data }) => data.allPowers.nodes.length),
                        map(
                            ({ data }) =>
                                data.allPowers.nodes[0].heroPowersByPower.nodes
                        )
                    )
            ),
            shareReplay()
        );
    }

    refreshTopHeroes() {
        this.heroesQuery.refetch();
    }
}
