import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";

import {RentalCalculatorService} from "./services/rental-calculator.service";
import {RentalCheckoutService} from "./services/rental-checkout.service";
import {RentalPricingService} from "./services/rental-pricing.service";
import {DefinitionDirective} from "./directives/definition.directive";
import {RentalListService} from "./services/rental-list.service";
import {Observable} from "rxjs";

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


  data: Observable<number> | undefined;
  values: Array<number> = [];
  anyErrors: boolean | undefined;
  finished: boolean | undefined;


  vehicles: IVehicle[] = []

  isLoading: boolean = true
  isCheckoutProcessing = false
  isCheckoutFinishedAndSucceed: boolean = false;

  init() {
    this.data = new Observable(observer => {
      setTimeout(() => {
        observer.next(42);
      }, 1000);

      setTimeout(() => {
        observer.next(43);
      }, 2000);

      setTimeout(() => {
        observer.complete();
      }, 3000);
    });

    let subscription = this.data.subscribe(
      value => this.values.push(value),
      error => this.anyErrors = true,
      () => this.finished = true
    );
  }

  daysAmount = this.rentalCalculator.rentalDays

  ngOnInit() {

    setTimeout(() => {
      this.vehicles = this.rentalListService.fetchVehicles()
      this.isLoading = false
    }, 350)


    // this.observable = new Observable((observer) => {
    //   setInterval(() => {
    //     observer.next(Math.random());
    //   }, 500);
    // });
    //
    // this.observer = this.observable.subscribe(
    //   (value) => {
    //     console.log(value);
    //   },
    //   (error) => {
    //     // errors here
    //   },
    //   () => {
    //     // complete
    //   }
    // );
  }

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


  dropRentedCar(id: any) {
    // @ts-ignore
    this.vehicles = this.vehicles.filter(item => item?.id !== id)
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

  getDailyPriceWithCurrency(vehicleClass: any) {
    return this.pricingService.getByClass(vehicleClass)
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }
}
