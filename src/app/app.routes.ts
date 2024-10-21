import { Routes } from '@angular/router';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { ListDriversComponent } from './list-drivers/list-drivers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateDriverComponent } from './update-driver/update-driver.component';
import { DeleteDriverComponent } from './delete-driver/delete-driver.component';
import { AddPackageComponent } from './add-package/add-package.component';
import { ListPackagesComponent } from './list-packages/list-packages.component';
import { DeletePackageComponent } from './delete-package/delete-package.component';
import { UpdatePackageComponent } from './update-package/update-package.component';
import { InvalidDataComponent } from './invalid-data/invalid-data.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GenAIComponent } from './gen-ai/gen-ai.component';
import { TranslateComponent } from './translate/translate.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'add-driver',
    component: AddDriverComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'list-drivers',
    component: ListDriversComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'delete-driver',
    component: DeleteDriverComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'update-driver',
    component: UpdateDriverComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'add-package',
    component: AddPackageComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'list-packages',
    component: ListPackagesComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'delete-package',
    component: DeletePackageComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'update-package',
    component: UpdatePackageComponent,
    // canActivate: [AuthGuard],
  },

  {
    path: 'statistics',
    component: StatisticsComponent,
  },

  {
    path: 'gen-ai',
    component: GenAIComponent,
  },

  {
    path: "translate",
    component: TranslateComponent
  },

  {
    path: 'signup',
    component: SignupComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'invalid-data',
    component: InvalidDataComponent,
  },

  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
