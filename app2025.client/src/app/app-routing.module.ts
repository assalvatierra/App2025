import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouterLinkActive } from '@angular/router';
import { SamplesComponent } from './samples/samples.component';
import { Samples2Component } from './samples2/samples2.component';

const routes: Routes = [
  {path: 'Sample01', component: SamplesComponent},
  {path: 'Sample02', component: Samples2Component},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLinkActive],
  exports: [RouterModule, RouterLinkActive]
})
export class AppRoutingModule { }
