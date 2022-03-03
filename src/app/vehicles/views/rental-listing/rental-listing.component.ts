import {Component, Input, OnInit} from '@angular/core';
import {RentalCalculatorService} from "../../services/rental-calculator.service";
import {RentalCheckoutService} from "../../services/rental-checkout.service";
import {RentalPricingService} from "../../services/rental-pricing.service";
import {RentalListService} from "../../services/rental-list.service";
import {VehiclesApiService} from "../../services/vehicles-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";

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
  isCheckoutProcessing: boolean = false
  isCheckoutFinishedAndSucceed: boolean = false;

  rentalDaysInput = new FormControl({
    value: this.rentalCalculator.rentalDays,
    disabled: false
  })

  vehiclesMakes$: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public rentalCalculator: RentalCalculatorService,
    public checkoutService: RentalCheckoutService,
    public pricingService: RentalPricingService,
    public rentalListService: RentalListService,
    private vehicleApiService: VehiclesApiService
  ) {
  }

  ngOnInit() {
    this.rentalDaysInput.valueChanges
      .subscribe((response) => {
        this.rentalCalculator.setDays(response)
      });

    this.availableVehicles = this.rentalListService.fetchVehicles()

    this.route.queryParamMap.subscribe(queryParams => {
      // console.log('RUN queryParamMap subscription event ')

      if (queryParams.keys.length) {
        console.log('QueryParams on page reload : ', queryParams.keys)

        const gradeFilterValue = queryParams.get('grade')
        const engineFilterValue = queryParams.get('engine_type')

        if (gradeFilterValue) {
          this.vehicles = this.filterVehicles({grade: gradeFilterValue})
        }

        if (engineFilterValue) {
          this.vehicles = this.filterVehicles({engine_type: engineFilterValue})
        }

        if (!this.vehicles.length) {
          console.log('No vehicles, show all')
          // this.vehicles = this.availableVehicles
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
    this.vehiclesMakes$ = this.vehicleApiService.getCarsMake()
  }

  onCheckoutClick() {
    this.isCheckoutProcessing = true

    const {id, make, model, dailyPrice} = this.rentalCalculator.pickedRental
    const price = this.rentalCalculator.rentalPrice

    setTimeout(() => {
      this.checkoutService.checkout({
        id, make, model, dailyPrice,
        price,
        method: 'Credit card',
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

    await this.router.navigate([], {
      relativeTo: this.route,
      queryParams: queryParams
    });
  }

  filterVehicles(filter: { [key: string]: string | number }) {
    let vehicles: any[] = []
    const filterKey = Object.keys(filter)[0]
    const filterValue: string | number = filter[filterKey].toString().toLowerCase()

    console.log(filterKey, filterValue)

    if (filterValue == 'all') {
      vehicles = this.availableVehicles
    } else {
      // @ts-ignore
      vehicles = this.availableVehicles.filter(vehicle => vehicle?.[filterKey]?.toLowerCase() === filterValue)
    }

    return vehicles
  }

  isCheckoutDisabled() {
    return !this.rentalCalculator.rentalDays || this.rentalCalculator.rentalPrice === 0
  }
}
