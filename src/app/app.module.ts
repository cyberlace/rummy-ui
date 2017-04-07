import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PageLoginComponent } from './page-login/page-login.component';
import { PageTablesComponent } from './page-tables/page-tables.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { PageCreateTableComponent } from './page-create-table/page-create-table.component';
import { PageSignupComponent } from './page-signup/page-signup.component';
import {RummyApiService} from "./shared/services/rummy-api.service";

const appRoutes: Routes = [
  { path: '',  redirectTo: '/tables', pathMatch: 'full' },
  { path: 'login', component: PageLoginComponent },
  { path: 'signup', component: PageSignupComponent },
  { path: 'tables', component: PageTablesComponent },
  { path: 'create-table', component: PageCreateTableComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    PageLoginComponent,
    PageTablesComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    PageCreateTableComponent,
    PageSignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, { useHash: true }),
  ],
  providers: [
    AuthenticationService,
    RummyApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
