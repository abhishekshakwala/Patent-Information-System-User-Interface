import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DisplayGridComponent } from './display-grid/display-grid.component';

const routes: Routes = [
    {path: '', component: DashboardComponent, pathMatch: 'full'},
    {path: 'app-dashboard', component: DashboardComponent, pathMatch: 'full'},
    {path: 'app-root', component: AppComponent},
    {path: 'app-display-grid', component: DisplayGridComponent}
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
