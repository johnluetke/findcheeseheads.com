import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component'
import { SearchPageComponent } from './search-page/search-page.component'

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:country', component: SearchPageComponent },
  { path: 'search/:country/:query', component: SearchPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
