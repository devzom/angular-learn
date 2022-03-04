import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate, CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';

import {CheckoutComponent} from "../checkout/checkout.component";
import {RentalCalculatorService} from "../vehicles/services/rental-calculator.service";

@Injectable({
  providedIn: 'root'
})

export class CheckoutGuard implements CanActivate, CanDeactivate<CheckoutComponent>, CanLoad {
  constructor(
    private router: Router,
    private rentalCalculator: RentalCalculatorService
  ) {
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.rentalCalculator.pickedRentalID) {
      alert('Request is invalid')
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!this.rentalCalculator.pickedRentalID && (!!route.queryParamMap.get('vehicleId') && !!route.queryParamMap.get('days'))
  }

  canDeactivate(
    component: CheckoutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // check if checkout form is DIRTY and ask if user want to cancel the progress
    // return component.canDeactivate() || window.confirm("Are you sure to cancel the checkout?");
    return window.confirm("Are you sure to abandon the checkout?");
  }
}
