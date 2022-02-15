import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from "./views/homepage/homepage.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  // {path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
