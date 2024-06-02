import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { SamplesComponent } from './samples/samples.component';
import { Samples2Component } from './samples2/samples2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
    declarations: [
        AppComponent,
        SamplesComponent,
        Samples2Component,
        PageNotFoundComponent,
        MainPageComponent,
    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, HttpClientModule,
        AppRoutingModule,
        MatTableModule, MatSortModule,
        MainMenuComponent
    ]
})
export class AppModule { }
