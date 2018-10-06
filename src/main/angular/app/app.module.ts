import { AgmCoreModule } from '@agm/core';
import { HTTP_INTERCEPTORS, HttpBackend, HttpClientModule, HttpRequest, HttpXhrBackend } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFittextModule } from "angular-fittext";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { VenueListingComponent } from './components/venue-listing/venue-listing.component';
import { FormatAddressDirective } from './directives/format-address.directive';
import { DecodePipe } from './filters/decode.pipe';
import { Nl2brPipe } from './filters/nl2br.pipe';
import { PrettyListPipe } from './filters/pretty-list.pipe';
import { APIKeyHttpInterceptor } from './http-interceptors';
import { BrowsePageComponent } from './pages/browse-page/browse-page.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
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
    FormatAddressDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFittextModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD9v9Fz3bIPgZ4Ri-B9NS0E7Q7_Bkj-FMg'
    })
  ],
  providers: [
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
