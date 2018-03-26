import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HomeComponent } from './components/home/home.component';
import { ApiModule } from './api/api.module';
import { DetailComponent } from './components/detail/detail.component';
import * as fromServices from './services';
import { HeroPowerService } from './services/hero-power.service';

@NgModule({
    declarations: [AppComponent, HomeComponent, DetailComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        ClarityModule,
        ApiModule,
        ROUTING
    ],
    providers: [...fromServices.services, HeroPowerService],
    bootstrap: [AppComponent]
})
export class AppModule {}
