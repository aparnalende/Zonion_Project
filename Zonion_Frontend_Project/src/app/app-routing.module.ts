import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './restaurant/add-restaurant/add-restaurant.component';
import { AdminComponent } from './admin/admin.component';
import { DisplayRestComponent } from './restaurant/display-rest/display-rest.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { EditRestComponent } from './restaurant/edit-rest/edit-rest.component';
import { ViewRestComponent } from './restaurant/view-rest/view-rest.component';
import { Page404Component } from './page404/page404.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  {
    path: 'viewrest/:id',
    component: ViewRestComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'addrest',
        component: AddRestaurantComponent,
      },
      {
        path: 'disprest',
        component: DisplayRestComponent,
      },
      {
        path: 'editrest/:id',
        component: EditRestComponent,
      },
      // {
      //   path:'viewrest/:id',
      //   component:ViewRestComponent
      // }
    ],
  },
  { path: '**', component: Page404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
