import { AgmCoreModule } from '@agm/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpRequest, HttpXhrBackend } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFittextModule } from "angular-fittext";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { ReportActionsComponent } from './components/report/report-actions/report-actions.component';
import { ReportIndicatorComponent } from './components/report/report-indicator/report-indicator.component';
import { ReportMessageComponent } from './components/report/report-message/report-message.component';
import { ReportService } from './components/report/report.service';
import { VenueListingComponent } from './components/venue-listing/venue-listing.component';
import { FormatAddressDirective } from './directives/format-address.directive';
import { DecodePipe } from './filters/decode.pipe';
import { Nl2brPipe } from './filters/nl2br.pipe';
import { PrettyListPipe } from './filters/pretty-list.pipe';
import { APIKeyHttpInterceptor } from './http-interceptors';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { BrowsePageComponent } from './pages/browse-page/browse-page.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { UiService } from './services/ui.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SearchPageComponent,
    PrettyListPipe,
    Nl2brPipe,
    HeaderComponent,
    VenueListingComponent,
    DecodePipe,
    BrowsePageComponent,
    AddPageComponent,
    FormatAddressDirective,
    ReportIndicatorComponent,
    ReportMessageComponent,
    ReportActionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFittextModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9v9Fz3bIPgZ4Ri-B9NS0E7Q7_Bkj-FMg'
    })
  ],
  providers: [
    ReportService,
    UiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIKeyHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
