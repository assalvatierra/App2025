import { Routes } from '@angular/router';
import { SampleformComponent } from './sampleform/sampleform.component';
import { SampletableComponent } from './sampletable/sampletable.component';
import { MycomponentComponent } from './mycomponent/mycomponent.component';

export const routes: Routes = [
  {
    path: 'sample',
    component: SampleformComponent
  },
  {
    path: 'table',
    component: MycomponentComponent

  }

];
