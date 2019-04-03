import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,

} from '@angular/material';

import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CalendarModule } from 'primeng/calendar';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NavService } from './nav.service';

import { AppComponent } from './app.component';
import { MenuListItemComponent } from './menu-list-item/menu-list-item.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayGridComponent } from './display-grid/display-grid.component';
import { AppInterceptor } from './appinterceptor';
import { ReportingComponent } from './reporting/reporting.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuListItemComponent,
    DashboardComponent,
    DisplayGridComponent,
    ReportingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    ChartModule,
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    CardModule,
    ProgressSpinnerModule,
    CalendarModule
  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    ChartModule,
    TableModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule
  ],
  providers: [NavService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
