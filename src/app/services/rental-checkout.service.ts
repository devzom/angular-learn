import {Injectable} from '@angular/core';
import {RentalPricingService} from "./rental-pricing.service";

@Injectable({
  providedIn: 'root'
})
export class RentalCheckoutService {

  constructor(private pricingService: RentalPricingService) {
  }

  checkout(checkoutData: any) {
    this.alertCheckout({...checkoutData, currency: this.pricingService.currency})
  }

  alertCheckout(message: any) {
    alert(JSON.stringify(message))
  }
}
