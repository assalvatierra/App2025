import { Routes } from "@angular/router";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { ContentComponent } from "./pages/content/content.component";

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
    }
];

export default routeConfig;