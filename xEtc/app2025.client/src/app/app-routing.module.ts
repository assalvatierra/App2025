import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { SamplesComponent } from './samples/samples.component';
import {SampleFormComponent} from './samples/sample-form/sample-form.component';
import { Samples2Component } from './samples2/samples2.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserLoginComponent } from './user-login/user-login.component';


const routes: Routes = [
  {path: 'Login', component: UserLoginComponent},
  {path: 'Sample01', component: SamplesComponent},
  {path: 'Sample-Form', component: SampleFormComponent},
  {path: 'Sample02', component: Samples2Component},
  {path: '', redirectTo: '/Sample01', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLinkActive],
  exports: [RouterModule, RouterLinkActive]
})
export class AppRoutingModule { }
