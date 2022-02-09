import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {RentalCalculatorService} from "./services/rental-calculator.service";
import {RentalCheckoutService} from "./services/rental-checkout.service";
import {RentalPricingService} from "./services/rental-pricing.service";
import {DefinitionDirective} from "./directives/definition.directive";
import {RentalListService} from "./services/rental-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() car: any;

  vehicles = this.rentalListService.getAvailableVehicles()


  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false
    }, 350)
  }

  @NgModule({
    declarations: [DefinitionDirective]
  })

  isLoading: boolean = true
  daysAmount = this.rentalCalculator.rentalDays

  constructor(public rentalCalculator: RentalCalculatorService,
              public checkoutService: RentalCheckoutService,
              public pricingService: RentalPricingService,
              private titleService: Title,
              public rentalListService: RentalListService
  ) {
    titleService.setTitle('Car rental')
  }


  onAddCarToRent(car: IVehicle) {
    this.rentalCalculator.rent(car)
  }

  onSetRentalDays(amount: number) {
    this.rentalCalculator.setDays(amount)
  }

  onCheckoutClick() {
    this.checkoutService.checkout({
      price: this.rentalCalculator.rentalPrice,
      method: 'Credit card',
    })
  }

  isCheckoutDisabled() {
    return !this.rentalCalculator.rentalDays || this.rentalCalculator.rentalPrice == 0
  }

  getDailyPriceWithCurrency(vehicleClass: any) {
    return this.pricingService.getByClass(vehicleClass)
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }


}
