import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomepageComponent} from "./views/homepage/homepage.component";
import {PageNotFoundComponent} from "./views/page-not-found/page-not-found.component";
import {CheckoutGuard} from "./guards/checkout.guard";
import {AuthGuard} from "./guards/auth.guard";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {ProfileComponent} from "./profile/profile.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {
    path: 'vehicles',
    loadChildren: () => import('./vehicles/vehicles-routing.module').then(m => m.VehiclesRoutingModule),
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then(m => m.CheckoutModule),
    canLoad: [CheckoutGuard]
  },

  {path: 'register', component: SignupComponent},
  {path: 'login', component: SigninComponent},
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
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
