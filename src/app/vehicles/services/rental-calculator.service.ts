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
    return this.pickedCar?.id
  }

  calculatePrice(
    days = this.rentalDaysAmount, grade: string | undefined = this.pickedCar?.grade
  ) {
    if (!days && !grade) return

    this.price = days * this.rentalPricingService.getByGrade(grade)
    return this.price
  }

  rent(car: IVehicle): void {
    this.pickedCar = car
    this.calculatePrice()
  }

  setDays(amount: number) {
    if (!!amount) {
      this.rentalDaysAmount = amount
      if (this.pickedCar) this.calculatePrice()
    }
  }

  resetData() {
    this.rentalDaysAmount = 0
    this.price = 0
    this.pickedCar = null
  }

}
