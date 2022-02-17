import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RentalListingComponent} from "./views/rental-listing/rental-listing.component";
import {RentalDetailsComponent} from "./views/rental-details/rental-details.component";

const routes: Routes = [
  {path: '', component: RentalListingComponent},
  {path: ':id', component: RentalDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule {
}
