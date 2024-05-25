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

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    Samples2Component
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    MatTableModule,MatSortModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
