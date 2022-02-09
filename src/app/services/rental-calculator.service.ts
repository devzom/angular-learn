import {Injectable} from '@angular/core';

import {RentalListService} from "./rental-list.service";
import {RentalPricingService} from "./rental-pricing.service";

@Injectable({
  providedIn: 'root'
})

export class RentalCalculatorService {

  constructor(public rentalListService: RentalListService, public rentalPricingService: RentalPricingService) {
  }

  vehicles = this.rentalListService.vehiclesList
  private price = 0
  private rentalDaysAmount: number = 0
  private pickedCar: IVehicle | any;

  get rentalPrice() {
    return this.price
  }

  get rentalDays() {
    return this.rentalDaysAmount
  }

  get pickedRental() {
    return this.pickedCar
  }

  get pickedRentalID() {
    return this.pickedCar?.id || 0
  }

  calculatePrice(
    days = this.rentalDaysAmount, vehicleClass = this.pickedCar?.class || null
  ) {
    console.log('Calculate price', {days: this.rentalDaysAmount, vehicleClass})
    return days * this.rentalPricingService.getByClass(vehicleClass)
  }

  rent(car: IVehicle): void {
    this.pickedCar = car

    this.price = this.calculatePrice()
  }

  setDays(amount: number) {
    if (!!amount) {
      console.log('Set days: ', amount)
      this.rentalDaysAmount = amount

      if (this.pickedCar) this.price = this.calculatePrice()
    }
  }

}
