import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthorityComponent } from './authority/authority.component';
import { AdminComponent } from './admin/admin.component';
import { PublicAccessComponent } from './public-access/public-access.component';
import { RouterModule, Routes } from '@angular/router';
import { authGuardAuthority } from './Services/authGuardAuthority.service';
import { HomeComponent } from './home/home.component';
import { authGuardAdmin } from './Services/authGuardAdmin.service';
import { TicketStatusComponent } from './ticket-status/ticket-status.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  {path : 'ticket' , component: PublicAccessComponent},
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent , canActivate : [authGuardAdmin] },
  { path: 'authority', component: AuthorityComponent, canActivate: [authGuardAuthority] },
  {path : "ticketStatus/:ticketId" , component : TicketStatusComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorityComponent,
    AdminComponent,
    PublicAccessComponent,
    HomeComponent,
    TicketStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
