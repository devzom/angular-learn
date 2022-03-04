import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from "./views/homepage/homepage.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {CheckoutGuard} from "./guards/checkout.guard";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles-routing.module').then(m => m.VehiclesRoutingModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    // canActivate: [CheckoutGuard],
    // canDeactivate: [CheckoutGuard],
    canLoad: [CheckoutGuard]
  },
  {path: '**', component: PageNotFoundComponent},  // Wildcard route for a 404 page
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
