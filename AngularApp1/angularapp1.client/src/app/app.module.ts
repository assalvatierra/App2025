import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { ItemPopupMenuComponent } from './shared/entity-list-table/item-popup-menu/item-popup-menu.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { EntityListTableComponent } from './shared/entity-list-table/entity-list-table.component';
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
    EntityListTableComponent,
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
  ],
  imports: [
    BrowserModule, HttpClientModule, CommonModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ItemPopupMenuComponent,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
