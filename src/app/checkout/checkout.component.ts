import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RentalListService} from "../vehicles/services/rental-list.service";
import {RentalPricingService} from "../vehicles/services/rental-pricing.service";
import {RentalCalculatorService} from "../vehicles/services/rental-calculator.service";
import {RentalCheckoutService} from "../vehicles/services/rental-checkout.service";
import {RoutingUtilsService} from "../shared/routing-utils.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalListService: RentalListService,
    private pricingService: RentalPricingService,
    public rentalCalculator: RentalCalculatorService,
    public checkoutService: RentalCheckoutService,
    private routingService: RoutingUtilsService
  ) {
  }

  checkoutForm = new FormGroup({
    name: new FormGroup({
      first: new FormControl('', [Validators.required, Validators.nullValidator]),
      last: new FormControl('', [Validators.required, Validators.nullValidator])
    }),
    address: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(10)]),
    documentId: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(9)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("^((\\+91-?)|0)?[0-9]{9}$")]),
    email: new FormControl('', [Validators.required, Validators.email]),
    paymentMethod: new FormControl('credit-card', [Validators.required])
  })

  checkoutMode: TCheckoutMode | null = null
  checkoutStatus: TCheckoutStatus = 'pending'

  orderDetails: any = {}
  detailsAvailable: boolean = false

  isLoading: boolean = true
  isCheckoutProcessing: boolean = false
  isCheckoutFinishedAndSucceed: boolean = false;


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log({params})
      let price = 0

      const {vehicleId, days, status = <TCheckoutStatus>'pending'} = params
      this.checkoutStatus = status

      if (status === <TCheckoutStatus>'finished') {
        this.router.navigate(['/'])
      }

      console.log({rental: this.rentalCalculator.pickedRental})

      if (vehicleId && days) {
        const vehicleDetails: any = this.rentalListService.getVehicleById(vehicleId)

        if (!vehicleDetails) {
          this.router.navigate(['/404'])
          return
        }

        if (vehicleDetails?.grade) {
          price = this.pricingService.getByGrade(vehicleDetails.grade) * days
        }

        if (!price) {
          console.error('Cannot calculate price for the rental.')
          this.router.navigate(['/'])
          return
        }

        this.orderDetails = {
          ...vehicleDetails,
          days,
          price
        }

        this.detailsAvailable = true
      } else {
        this.router.navigate(['/404'])
      }
    });

  }


  setCheckoutMode(mode: TCheckoutMode) {
    this.checkoutMode = mode

    if (this.checkoutMode === 'user') {
      this.router.navigate(['/login'])
    }
  }

  async onCheckoutSubmit($event?: any) {
    $event.preventDefault()
    // console.log(this.checkoutForm.status);
    // console.log($event)

    await this.processCheckout().then(() => {
      // this.routingService.appendAQueryParam('status', 'finished', '', true, true)

      setTimeout(() => {
        console.log('Redirect to homepage')
        this.checkoutForm.reset()
        this.router.navigate(['/'])
      }, 5000)

    }).catch((e) => {
      this.routingService.appendAQueryParam('status', <TCheckoutStatus>'error')
      console.error(e)
      alert('Order couldn\'t be processed, try again.')
      this.router.navigate(['/'])
    })
  }


  async processCheckout() {
    this.isCheckoutProcessing = true
    const method = this.checkoutForm.value?.paymentMethod
    const {make, model, price} = this.orderDetails

    if (!method) {
      throw Error('No payment method available.')
    }

    this.checkoutService.checkout({
      make,
      model,
      price,
      method
    })

    setTimeout(() => {
      this.isCheckoutProcessing = false
      this.isCheckoutFinishedAndSucceed = true;
      this.rentalCalculator.resetData()
    }, 2500)
  }


  canDeactivate() {
    console.log('Run canDeactivate on Checkout')
    console.log(this.checkoutForm)

    return this.checkoutForm?.touched || this.checkoutForm?.dirty
  }
}
