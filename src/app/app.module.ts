import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {PageLoginComponent} from './page-login/page-login.component';
import {PageTablesComponent} from './page-tables/page-tables.component';
import {AuthenticationService} from './shared/services/authentication.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {PageCreateTableComponent} from './page-create-table/page-create-table.component';
import {PageSignupComponent} from './page-signup/page-signup.component';
import {RummyApiService} from './shared/services/rummy-api.service';
import {SocketService} from './shared/services/socket.service';
import {PageValidateEmailComponent} from './page-validate-email/page-validate-email.component';
import {GameTablesService} from './shared/services/game-tables.service';
import {PageGameTableComponent} from './page-game-table/page-game-table.component';
import {TableUsersService} from './shared/services/table-users.service';

const appRoutes: Routes = [
  {path: '', redirectTo: '/game-tables', pathMatch: 'full'},
  {path: 'login', component: PageLoginComponent},
  {path: 'signup', component: PageSignupComponent},
  {path: 'validate-email', component: PageValidateEmailComponent},
  {path: 'game-tables', component: PageTablesComponent},
  {path: 'game-table/:gameTableId', component: PageGameTableComponent},
  {path: 'create-table', component: PageCreateTableComponent},
  {path: '**', component: PageNotFoundComponent}
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
    PageSignupComponent,
    PageValidateEmailComponent,
    PageGameTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot(appRoutes, {useHash: true}),
  ],
  providers: [
    RummyApiService,
    SocketService,
    AuthenticationService,
    GameTablesService,
    TableUsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
