import { Routes } from "@angular/router";
import { ContentComponent } from "./pages/content/content.component";
import { AnalyticsComponent } from "./pages/analytics/analytics.component";
import { CommentsComponent } from "./pages/comments/comments.component";
import { VideosComponent } from "./pages/content/videos/videos.component";
import { CountriesComponent } from "./pages/countries/countries.component";
import { CountryFormComponent } from "./pages/countries/country-form/country-form.component";
import { CitiesComponent } from "./pages/cities/cities.component";
import { EntityComponent } from "./pages/entity/entity.component";
import { EntityFormPageComponent } from "./pages/entity/entity-form-page/entity-form-page.component";
import { BusinessUnitComponent } from "./pages/business-unit/business-unit.component";
import { BusinessUnitFormComponent } from "./pages/business-unit/business-unit-form/business-unit-form.component";
import { LoginComponent } from "./pages/login/login.component";
import { AuthGuard } from "./core/auth.guard";
import { CityFormComponent } from "./pages/cities/city-form/city-form.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { ContactsFormComponent } from "./pages/contacts/contacts-form/contacts-form.component";
import { ItemTypesComponent } from "./pages/itemtypes/itemtypes.component";
import { ItemTypesFormComponent } from "./pages/itemtypes/itemtypes-form/itemtypes-form.component";
import { ItemStatusComponent } from "./pages/itemstatus/itemstatus.component";
import { ItemStatusFormComponent } from "./pages/itemstatus/itemstatus-form/itemstatus-form.component";
import { ServiceItemsComponent } from "./pages/serviceitems/serviceitems.component";
import { ServiceItemsFormComponent } from "./pages/serviceitems/serviceitems-form/serviceitems-form.component";

const routeConfig: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: ''
    },
    {
      path: 'Entities',
      component: EntityComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'entities/form/:id',
      component: EntityFormPageComponent
    },
    {
      path: 'businessunits',
      component: BusinessUnitComponent
    },
    {
      path: 'businessunits/form/:id',
      component: BusinessUnitFormComponent
    },
    {
        path: 'references',
        component: CountriesComponent
    },
    {
      path: 'references/countries',
      component: CountriesComponent
    },
    {
        path: 'references/countries/form/:id',
        component: CountryFormComponent
    },
    {
      path: 'references/cities',
      component: CitiesComponent
    },
    {
      path: 'references/cities/form/:id',
      component: CityFormComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'contacts',
      component: ContactsComponent
    },
    {
      path: 'contacts/form/:id',
      component: ContactsFormComponent
    },
    {
      path: 'references/itemtypes',
      component: ItemTypesComponent
    },
    {
      path: 'references/itemtypes/form/:id',
      component: ItemTypesFormComponent
    },
    {
      path: 'references/itemstatus',
      component: ItemStatusComponent
    },
    {
      path: 'references/itemstatus/form/:id',
      component: ItemStatusFormComponent
    },
    {
      path: 'references/serviceitems',
      component: ServiceItemsComponent
    },
    {
      path: 'references/serviceitems/form/:id',
      component: ServiceItemsFormComponent
    }

];

export default routeConfig;
