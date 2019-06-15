import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './CRM/WORKSPACE/login/login.component';
import { MainMenuComponent } from './CRM/WORKSPACE/blocks/main-menu/main-menu.component';
import { AuthGuard } from './SERVICES/authguard/auth.guard';

const routes: Routes = [
  { path: 'workspace', canActivate: [AuthGuard], component: MainMenuComponent, children: [
    //{ path: '', pathMatch: 'full', component: dwdwdw},
  ]},
  { path: 'workspace/login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 