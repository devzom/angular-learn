import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

/* Services*/
import {RentalCalculatorService} from "./services/rental-calculator.service";
import {RentalCheckoutService} from "./services/rental-checkout.service";
import {DefinitionDirective} from "./directives/definition.directive";
import {RentalListService} from "./services/rental-list.service";
import {VehiclesService} from "./services/vehicles.service";
import {RentalPricingService} from "./services/rental-pricing.service";


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
  vehiclesTest$: any;

  constructor(public rentalCalculator: RentalCalculatorService,
              public checkoutService: RentalCheckoutService,
              public pricingService: RentalPricingService,
              private titleService: Title,
              public rentalListService: RentalListService,
              private carsService: VehiclesService
  ) {
    titleService.setTitle('Car rental')
  }

  ngOnInit() {
    setTimeout(() => {
      this.vehicles = this.rentalListService.fetchVehicles()
      this.isLoading = false
    }, 350)

  }

  fetchCarsMakeAPI() {
    this.vehiclesTest$ = this.carsService.getCarsMake()
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
        this.isCheckoutFinishedAndSucceed = true;
        this.isCheckoutProcessing = false

        this.vehicles = this.rentalListService.getAvailableVehicles()
        this.rentalCalculator.resetData()
      }, 150)


      setTimeout(() => {
        this.isCheckoutFinishedAndSucceed = false;
      }, 2000)

    }, 450)
  }

  getDailyPriceWithCurrency(vehicleClass: any) {
    return this.pricingService.getByClass(vehicleClass)
  }

  isCheckoutDisabled() {
    return !this.rentalCalculator.rentalDays || this.rentalCalculator.rentalPrice == 0
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }
}
