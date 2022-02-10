import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {RentalCalculatorService} from "./services/rental-calculator.service";
import {RentalCheckoutService} from "./services/rental-checkout.service";
import {DefinitionDirective} from "./directives/definition.directive";
import {RentalListService} from "./services/rental-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @Input() car: any;

  @NgModule({
    declarations: [DefinitionDirective]
  })

  vehicles: IVehicle[] = []

  isLoading: boolean = true
  isCheckoutProcessing = false
  isCheckoutFinishedAndSucceed: boolean = false;

  daysAmount = this.rentalCalculator.rentalDays

  ngOnInit() {

    setTimeout(() => {
      this.vehicles = this.rentalListService.fetchVehicles()
      this.isLoading = false
    }, 350)
  }

  constructor(public rentalCalculator: RentalCalculatorService,
              public checkoutService: RentalCheckoutService,
              private titleService: Title,
              public rentalListService: RentalListService
  ) {
    titleService.setTitle('Car rental')
  }

  onAddCarToRent(car: IVehicle) {
    this.rentalCalculator.rent(car)
  }

  onCheckoutClick() {
    this.isCheckoutProcessing = true

    setTimeout(() => {
      this.checkoutService.checkout({
        price: this.rentalCalculator.rentalPrice,
        method: 'Credit card',
        vehicleId: this.rentalCalculator.pickedRentalID
      })

      setTimeout(() => {

        setTimeout(() => {
          this.isCheckoutFinishedAndSucceed = true;
          this.isCheckoutProcessing = false

          this.vehicles = this.rentalListService.getAvailableVehicles()
          this.rentalCalculator.resetData()
        }, 150)


        this.isCheckoutFinishedAndSucceed = false;
      }, 2000)

    }, 450)
  }

  isCheckoutDisabled() {
    return !this.rentalCalculator.rentalDays || this.rentalCalculator.rentalPrice == 0
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }
}