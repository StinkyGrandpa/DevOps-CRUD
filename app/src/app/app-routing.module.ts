import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserIndexView } from './views/users-index/users-index.component';

const routes: Routes = [
  { path: "/", component: UserIndexView },
  { path: "**", redirectTo: "/", pathMatch: "full" }
];

@NgModule({
  declarations: [
    UserIndexView
  ],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
