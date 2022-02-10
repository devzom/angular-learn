import {Injectable} from '@angular/core';
import {RentalPricingService} from "./rental-pricing.service";

@Injectable({
  providedIn: 'root'
})

export class RentalCalculatorService {

  constructor(public rentalPricingService: RentalPricingService) {
  }

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
    return days * this.rentalPricingService.getByClass(vehicleClass)
  }

  rent(car: IVehicle): void {
    this.pickedCar = car
    this.price = this.calculatePrice()
  }

  setDays(amount: number) {
    if (!!amount) {
      this.rentalDaysAmount = amount
      if (this.pickedCar) this.price = this.calculatePrice()
    }
  }


  resetData() {
    this.rentalDaysAmount = 0
    this.price = 0
    this.pickedCar = null
  }

}
