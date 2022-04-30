import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { WildRouteComponent } from './wild-route/wild-route.component';
import {MatIconModule} from '@angular/material/icon';
import { InterceptService } from './Services/intercept.service';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ticket', component: PublicAccessComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuardAdmin] },
  { path: 'authority', component: AuthorityComponent, canActivate: [authGuardAuthority] },
  { path: "ticketStatus/:ticketId", component: TicketStatusComponent },
  { path: '**', component: WildRouteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorityComponent,
    AdminComponent,
    PublicAccessComponent,
    HomeComponent,
    TicketStatusComponent,
    WildRouteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatIconModule,
  ],
  providers: [{provide : HTTP_INTERCEPTORS , 
    useClass:InterceptService , 
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
