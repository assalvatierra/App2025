import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ContentComponent } from "./pages/content/content.component";
import { AnalyticsComponent } from "./pages/analytics/analytics.component";
import { CommentsComponent } from "./pages/comments/comments.component";
import { VideosComponent } from "./pages/content/videos/videos.component";
import { CountriesComponent } from "./pages/countries/countries.component";
import { CountryFormComponent } from "./pages/countries/country-form/country-form.component";

const routeConfig: Routes = [

    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    },
    {
        path: 'dashboard',
        component: DashboardComponent
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
      path: 'references/countries',
      component: CountriesComponent
  },
  {
    path: 'references/countries/form',
    component: CountryFormComponent
  }


];

export default routeConfig;
