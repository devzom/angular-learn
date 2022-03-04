import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate, CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';

import {CheckoutComponent} from "../checkout/checkout.component";

@Injectable({
  providedIn: 'root'
})

export class CheckoutGuard implements CanActivate, CanDeactivate<CheckoutComponent>, CanLoad {
  constructor() {

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!route.queryParamMap.get('vehicleId') && !!route.queryParamMap.get('days')
  }

  canDeactivate(
    component: CheckoutComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // check if checkout form is DIRTY and ask if user want to cancel the progress
    // return component.canDeactivate() || window.confirm("Are you sure to cancel the checkout?");
    return window.confirm("Are you sure to cancel the checkout?");
  }
}
