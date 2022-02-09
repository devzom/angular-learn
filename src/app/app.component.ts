import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {RentalCalculatorService} from "./services/rental-calculator.service";
import {RentalCheckoutService} from "./services/rental-checkout.service";
import {RentalPricingService} from "./services/rental-pricing.service";
import {DefinitionDirective} from "./directives/definition.directive";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() car: any;

  constructor(public rentalCalculator: RentalCalculatorService,
              public checkoutService: RentalCheckoutService,
              public pricingService: RentalPricingService,
              private titleService: Title
  ) {
    titleService.setTitle('Car rental')
  }


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
  vehicles = this.rentalCalculator.vehicles


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

  getDailyPriceWithCurrency(vehicleClass: any) {
    return this.pricingService.getByClass(vehicleClass)
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }


}
