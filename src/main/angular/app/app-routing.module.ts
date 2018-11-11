import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPageComponent } from './pages/add-page/add-page.component'
import { BrowsePageComponent } from './pages/browse-page/browse-page.component'
import { LandingPageComponent } from './pages/landing-page/landing-page.component'
import { SearchPageComponent } from './pages/search-page/search-page.component'

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'add', component: AddPageComponent },
  { path: 'browse', component: BrowsePageComponent },
  { path: 'search', component: SearchPageComponent },
  { path: 'search/:query', component: SearchPageComponent },
  { path: 'search/:country/:query', component: SearchPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
