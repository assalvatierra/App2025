import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { Samples2Component } from './samples2/samples2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MainMenuComponent } from "./main-menu/main-menu.component";
import { MainPageComponent } from './main-page/main-page.component';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { SampleFormComponent } from './samples/sample-form/sample-form.component';


@NgModule({
    declarations: [
        AppComponent,
        // SamplesComponent,
        Samples2Component,
        PageNotFoundComponent,
        MainHeaderComponent,
        MainFooterComponent,
        SampleFormComponent,

    ],
    providers: [
        provideAnimationsAsync()
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule, HttpClientModule,
        AppRoutingModule,
        MatSidenavModule,
        MatIconModule,
        MatTableModule, MatSortModule,
        MatMenuModule,MatButtonModule,
        MainMenuComponent,MainPageComponent,UserLoginComponent,
    ]
})
export class AppModule { }
