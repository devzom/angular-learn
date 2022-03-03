import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RentalListService} from "../vehicles/services/rental-list.service";
import {RentalPricingService} from "../vehicles/services/rental-pricing.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutForm = new FormGroup({
    name: new FormGroup({
      first: new FormControl('', [Validators.required, Validators.nullValidator]),
      last: new FormControl('', [Validators.required, Validators.nullValidator])
    }),
    address: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(10)]),
    documentId: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(9)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.nullValidator]),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  orderDetails: any = {}
  detailsAvailable: boolean = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private rentalListService: RentalListService,
    private pricingService: RentalPricingService,
  ) {
  }

  get email() {
    return this.checkoutForm.get('email')
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log({params})
      const {vehicleId, days} = params

      if (vehicleId && days) {
        let price = 0

        const vehicleDetails = this.rentalListService.getVehicleById(vehicleId)


        if (!vehicleDetails) {
          this.router.navigate(['/404'])
          return
        }

        // @ts-ignore
        if (vehicleDetails?.grade) {
          // @ts-ignore
          price = this.pricingService.getByGrade(vehicleDetails.grade) * days
        }

        this.orderDetails = {
          ...vehicleDetails,
          days,
          price
        }
        console.log(this.orderDetails)

        this.detailsAvailable = true
      }
    });

  }

  getFormValidationErrors() {
    Object.keys(this.checkoutForm.controls).forEach(key => {
      // @ts-ignore
      const controlErrors: ValidationErrors = this.checkoutForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  onCheckoutSubmit($event?: any) {
    console.log(this.checkoutForm.status);

    $event.preventDefault()
    console.log($event)
    alert('Thank You for order')
    this.checkoutForm.reset()

    this.router.navigate(['/'])
  }
}
