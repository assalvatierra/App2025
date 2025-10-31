import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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
import { MatCardModule } from '@angular/material/card';
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
    ItemTypesComponent,
    ItemTypesFormComponent,
    ItemStatusComponent,
    ItemStatusFormComponent,
    ServiceItemsComponent,
    ServiceItemsFormComponent,
    AgentChatComponent,
    AgentsComponent,
    AgentFormComponent,
    JobMainComponent,
    JobMainFormComponent
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
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    SharedModule, 
    JobServiceModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
