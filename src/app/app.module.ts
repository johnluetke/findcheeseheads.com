import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AngularFittextModule } from "angular-fittext";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiService } from './ui.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { PrettyListPipe } from './filters/pretty-list.pipe';
import { Nl2brPipe } from './filters/nl2br.pipe';
import { HeaderComponent } from './components/header/header.component';
import { VenueListingComponent } from './components/venue-listing/venue-listing.component';
import { DecodePipe } from './filters/decode.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    SearchPageComponent,
    PrettyListPipe,
    Nl2brPipe,
    HeaderComponent,
    VenueListingComponent,
    DecodePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFittextModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [UiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
