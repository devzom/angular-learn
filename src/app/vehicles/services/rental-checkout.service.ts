import {Injectable} from '@angular/core';
import {RentalListService} from "./rental-list.service";

@Injectable({
  providedIn: 'root'
})
export class RentalCheckoutService {

  constructor(private rentalListService: RentalListService) {
  }

  alertCheckout(message: any) {
    const msg = `Do You accept the order ${JSON.stringify(message)}? `
    return confirm(msg)
  }

  checkout(checkoutData: any) {
    let checkoutResponse = this.alertCheckout({...checkoutData})

    if (!checkoutResponse) {
      alert('You have canceled the checkout')
    } else {
      this.rentalListService.setVehicleUnavailable(checkoutData?.id)
    }

    return checkoutResponse
  }
}
