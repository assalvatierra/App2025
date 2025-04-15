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

const routeConfig: Routes = [

    {
        path: '',
        pathMatch: 'full',
    redirectTo: 'Entities'
    },
    {
        path: 'Entities',
      component: EntityComponent
    },
    {
      path: 'entities/form/:id',
      component: EntityFormPageComponent
    },
    {
        path: 'content',
        component: ContentComponent
    },
    {
        path: 'analytics',
        component: AnalyticsComponent
    },
    {
        path: 'comments',
        component: CommentsComponent
    },
    {
        path: 'content/videos',
        component: VideosComponent
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


];

export default routeConfig;
