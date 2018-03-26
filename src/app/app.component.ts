import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalAlertService } from './services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    networkErrors: string[] = [];
    subscriptions: Subscription[] = [];

    constructor(private globalAlertService: GlobalAlertService) {}

    ngOnInit() {
        this.subscriptions.push(
            this.globalAlertService.networkError$.subscribe(error => {
                this.networkErrors.push(error);
            })
        );
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
