import { CommonModule } from '@angular/common';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ContentComponent } from './pages/content/content.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { MenuItemComponent } from './core/navigation/menu-item/menu-item.component';
import { VideosComponent } from './pages/content/videos/videos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityFormComponent } from './shared/entity-form/entity-form.component';
import { CountriesComponent } from './pages/countries/countries.component';
import { CountryFormComponent } from './pages/countries/country-form/country-form.component';
import { CitiesComponent } from './pages/cities/cities.component';
import { EntityComponent } from './pages/entity/entity.component';
import { EntityFormPageComponent } from './pages/entity/entity-form-page/entity-form-page.component';
import { ContactInfoFormComponent } from './shared/contact-info-form/contact-info-form.component';
import { BusinessUnitComponent } from './pages/business-unit/business-unit.component';
import { BusinessUnitFormComponent } from './pages/business-unit/business-unit-form/business-unit-form.component';
import { ListDialogComponent } from './shared/list-dialog/list-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CityFormComponent } from './pages/cities/city-form/city-form.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ContactsFormComponent } from './pages/contacts/contacts-form/contacts-form.component';
import { ContactEntityListComponent } from './pages/contacts/contact-entity-list/contact-entity-list.component';
import { ItemTypesComponent } from './pages/itemtypes/itemtypes.component';
import { ItemTypesFormComponent } from './pages/itemtypes/itemtypes-form/itemtypes-form.component';
import { ItemStatusComponent } from './pages/itemstatus/itemstatus.component';
import { ItemStatusFormComponent } from './pages/itemstatus/itemstatus-form/itemstatus-form.component';
import { ServiceItemsComponent } from './pages/serviceitems/serviceitems.component';
import { ServiceItemsFormComponent } from './pages/serviceitems/serviceitems-form/serviceitems-form.component';
import { AgentChatComponent } from './pages/agent-chat/agent-chat.component';
import { AgentsComponent } from './pages/agents/agents.component';
import { AgentFormComponent } from './pages/agents/agent-form/agent-form.component';
import { JobMainComponent } from './pages/job-main/job-main.component';
import { JobMainFormComponent } from './pages/job-main/job-main-form/job-main-form.component';
import { SharedModule } from './shared/shared.module'; 
import { JobServiceModule } from './pages/job-service/job-service.module';
import { JobMainDetailsComponent } from './pages/job-main/job-main-form/job-main-details/job-main-details.component';
import { JobMainServicesComponent } from './pages/job-main/job-main-form/job-main-services/job-main-services.component';
import { JobMainServiceDialogComponent } from './pages/job-main/job-main-form/job-main-services/job-main-service-dialog/job-main-service-dialog.component';
import { JobServiceBudgetComponent } from './pages/job-main/job-main-form/job-service-budget/job-service-budget.component';
import { JobServiceBudgetDialogComponent } from './pages/job-main/job-main-form/job-service-budget/job-service-budget-dialog/job-service-budget-dialog.component';
import { JobMainCustomerComponent } from './pages/job-main/job-main-form/job-main-customer/job-main-customer.component';
import { JobMainContactsComponent } from './pages/job-main/job-main-form/job-main-contacts/job-main-contacts.component';
import { JobCustomerDetailsComponent } from './pages/job-main/job-main-form/job-main-customer/job-customer-details/job-customer-details.component';
import { JobCustomerFormComponent } from './pages/job-main/job-main-form/job-main-customer/job-customer-form/job-customer-form.component';
import { JobMainStatusListComponent } from './pages/job-main/job-main-form/job-main-status-list/job-main-status-list.component';
import { JobMainStatusDialogComponent } from './pages/job-main/job-main-form/job-main-status-list/job-main-status-dialog/job-main-status-dialog.component';
import { JobMainScheduleComponent } from './pages/job-main/job-main-form/job-main-schedule/job-main-schedule.component';
import { JobScheduleDialogComponent } from './pages/job-main/job-main-form/job-main-schedule/job-schedule-dialog/job-schedule-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EntityContactListComponent } from './pages/entity/entity-contact-list/entity-contact-list.component';
import { ChecklistItemComponent } from './pages/checklist-item/checklist-item.component';
import { ChecklistItemFormComponent } from './pages/checklist-item/checklist-item-form/checklist-item-form.component';
import { ChecklistFormComponent } from './pages/checklist-form/checklist-form.component';
import { ChecklistModule } from './shared/checklist-transaction/checklist.module';
import { MatDividerModule } from '@angular/material/divider';
import { JobMainPaymentComponent } from './pages/job-main/job-main-form/job-main-payment/job-main-payment.component';
import { ClientJobMainFormComponent } from './pages/job-main/client-job-main-form/client-job-main-form.component';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { PublicLayoutComponent } from './core/layouts/public-layout/public-layout.component';
import { PaymentSuccessComponent } from './pages/PaymentGateway/payment-success/payment-success.component';
import { MainComponentComponent } from './pages/main-component/main-component.component';

// Import MSAL dependencies
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import { 
  MsalModule, 
  MsalInterceptor, 
  MsalGuard, 
  MsalRedirectComponent 
} from '@azure/msal-angular';
import { environment } from '../environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    ContentComponent,
    AnalyticsComponent,
    CommentsComponent,
    MenuItemComponent,
    VideosComponent,
    CountriesComponent,
    CountryFormComponent,
    EntityFormComponent,
    EntityFormPageComponent,
    CitiesComponent,
    EntityComponent,
    ContactInfoFormComponent,
    BusinessUnitComponent,
    BusinessUnitFormComponent,
    ListDialogComponent,
    LoginComponent,
    CityFormComponent,
    ContactsComponent,
    ContactsFormComponent,
    ContactEntityListComponent,
    ItemTypesComponent,
    ItemTypesFormComponent,
    ItemStatusComponent,
    ItemStatusFormComponent,
    ServiceItemsComponent,
    ServiceItemsFormComponent,
    AgentChatComponent,
    AgentsComponent,
    AgentFormComponent,
    JobMainFormComponent,
    JobMainDetailsComponent,
    JobMainServicesComponent,
    JobMainServiceDialogComponent,
    JobServiceBudgetComponent,
    JobServiceBudgetDialogComponent,
    JobMainCustomerComponent,
  JobMainContactsComponent,
    JobMainStatusListComponent,
    JobMainStatusDialogComponent,
    EntityContactListComponent,
    ChecklistItemComponent,
    ChecklistItemFormComponent,
    ChecklistFormComponent,
    JobMainPaymentComponent,
    ClientJobMainFormComponent,
    MainLayoutComponent,
    PublicLayoutComponent,
    PaymentSuccessComponent,
    MainComponentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // Added for Angular Material
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatDividerModule,
    SharedModule, 
    ChecklistModule,
    JobServiceModule,
    JobMainComponent,
    JobMainScheduleComponent,
    JobScheduleDialogComponent,
    // Configure MSAL Module
    MsalModule.forRoot(
      new PublicClientApplication({
        auth: {
          clientId: environment.entraConfig.clientId,
          authority: environment.entraConfig.authority,
          redirectUri: environment.entraConfig.redirectUri,
        },
        cache: {
          cacheLocation: 'localStorage',
        }
      }),
      {
        interactionType: InteractionType.Redirect, // Login strategy for Guard
        authRequest: { scopes: environment.apiConfig.scopes }
      },
      {
        interactionType: InteractionType.Redirect, // Interceptor strategy
        protectedResourceMap: new Map([
          [environment.apiConfig.uri, environment.apiConfig.scopes] // Attach token to these URLs
        ])
      }
    )

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor, // Automatically injects Bearer token into HTTP requests
      multi: true
    },
    MsalGuard // Ready to be used in app-routing.module.ts to protect routes
  ],
  bootstrap: [AppComponent, MsalRedirectComponent] // Added MsalRedirectComponent to handle redirect responses
})
export class AppModule { }
