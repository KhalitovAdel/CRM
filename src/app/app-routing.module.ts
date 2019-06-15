import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './CRM/WORKSPACE/login/login.component';
import { MainMenuComponent } from './CRM/WORKSPACE/blocks/main-menu/main-menu.component';

const routes: Routes = [
  { path: 'workspace', component: MainMenuComponent},
  { path: 'workspace/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 