import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthGuard } from './SERVICES/authguard/auth.guard';
import { TextMaskModule } from 'angular2-text-mask';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './CRM/WORKSPACE/login/login.component';
import { MainMenuComponent } from './CRM/WORKSPACE/blocks/main-menu/main-menu.component';
import { ProfileComponent } from './CRM/WORKSPACE/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainMenuComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    TextMaskModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    AuthGuard,
    MatDatepickerModule,
    { provide: LOCALE_ID, useValue: "ru" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
