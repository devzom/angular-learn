import {Component, Input, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {RentalCalculatorService} from "../../services/rental-calculator.service";
import {RentalCheckoutService} from "../../services/rental-checkout.service";
import {RentalPricingService} from "../../services/rental-pricing.service";
import {RentalListService} from "../../services/rental-list.service";
import {VehiclesService} from "../../services/vehicles.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-rental-listing',
  templateUrl: './rental-listing.component.html',
  styleUrls: ['./rental-listing.component.css']
})
export class RentalListingComponent implements OnInit {
  @Input() car: any;

  vehicles: IVehicle[] = []
  availableVehicles: IVehicle[] = []

  isLoading: boolean = true
  isCheckoutProcessing = false
  isCheckoutFinishedAndSucceed: boolean = false;
  daysAmount = this.rentalCalculator.rentalDays
  vehiclesMakes$: any;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    private router: Router,
    public rentalCalculator: RentalCalculatorService,
    public checkoutService: RentalCheckoutService,
    public pricingService: RentalPricingService,
    public rentalListService: RentalListService,
    private carsService: VehiclesService
  ) {
    titleService.setTitle('Car rental')
  }

  ngOnInit() {
    this.availableVehicles = this.rentalListService.fetchVehicles()

    this.route.queryParamMap.subscribe(queryParams => {
      if (!!queryParams.keys.length) {
        if (queryParams.has('grade')) {
          const value = queryParams.get('grade')

          // @ts-ignore
          this.vehicles = this.filterVehicles({grade: value})
        }

      } else {
        this.vehicles = this.availableVehicles
      }
    })

    setTimeout(() => {
      this.isLoading = false
    }, 350)
  }

  fetchCarsMakeAPI() {
    this.vehiclesMakes$ = this.carsService.getCarsMake()
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


  getCurrentQueryParams() {
    let actualParams = {}

    this.route.queryParams.subscribe(queryParam => {
      actualParams = queryParam
    }).unsubscribe()

    console.log({actualParams})
    return actualParams
  }

  async onSetListingFilter(event: any) {
    let queryParams = {}
    const actualQueryParams = this.getCurrentQueryParams() || {}


    const param = event.param
    const value = event.value.toLocaleLowerCase()
    const queryParam = {[param]: value}


    // reset filter if user pick option 'all' which reset the filter
    // @ts-ignore
    if (value === 'all' && actualQueryParams?.[param]) {
      console.log(`Reset ${event.param} filter`)

      // @ts-ignore
      const {[param]: oldParam, ...newQueryParams} = actualQueryParams
      queryParams = newQueryParams
    } else {
      // @ts-ignore
      queryParams = {...actualQueryParams, ...queryParam}
    }

    await this.router.navigate(['/vehicles'], {
      relativeTo: this.route,
      queryParams: queryParams
    });

    this.filterVehicles({param, value})
  }

  filterVehicles(filter: { [key: string]: string | number }) {
    let vehicles: any[] = []
    const filterKey = Object.keys(filter)[0]
    const filterValue = filter[filterKey]

    if (filterValue == 'all') {
      vehicles = this.availableVehicles
    } else {
      // @ts-ignore
      vehicles = this.availableVehicles.filter(vehicle => vehicle[filterKey]?.toLowerCase() == filterValue)
    }

    return vehicles
  }

  getDailyPriceWithCurrency(vehicleClass: any) {
    return this.pricingService.getByClass(vehicleClass)
  }

  isCheckoutDisabled() {
    return !this.rentalCalculator.rentalDays || this.rentalCalculator.rentalPrice === 0
  }

  testLog(msg: any = 'test log') {
    console.log(msg)
  }
}
