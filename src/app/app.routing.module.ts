import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RentalDetailsComponent} from "./views/rental-details/rental-details.component";
import {RentalListingComponent} from "./views/rental-listing/rental-listing.component";
import {RentalHomeComponent} from "./views/rental-home/rental-home.component";
// import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";

const routes: Routes = [
// @ts-ignore
  {path: '', component: RentalHomeComponent},
  {path: 'vehicles', component: RentalListingComponent},
  {path: 'vehicles/:id', component: RentalDetailsComponent},
  // {path: '*', component: PageNotFoundComponent},  // Wildcard route for a 404 page
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
