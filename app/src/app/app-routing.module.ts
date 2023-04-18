import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexViewComponent } from './views/users-index/users-index.component';
import { LoginViewComponent } from './modules/authentication/views/login/login.component';
import { ResetViewComponent } from './modules/authentication/views/reset/reset.component';
import { isAuthenticatedFn } from './modules/authentication/guards/canMatchFn.guard';

const routes: Routes = [
  { path: "", component: UserIndexViewComponent, canMatch: [isAuthenticatedFn] },
  { path: "auth/login", component: LoginViewComponent },
  { path: "auth/reset", component: ResetViewComponent },
  // { path: "**", redirectTo: "/", pathMatch: "full", canMatch: [isAuthenticatedFn] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
