import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {RentalListService} from "../../services/rental-list.service";
import {RentalPricingService} from "../../services/rental-pricing.service";


@Component({
  selector: 'app-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: []
})
export class RentalDetailsComponent implements OnInit {
  // details$: Observable<any> | undefined;
  details: any;
  id: number | undefined
  dailyPrice: number = 0

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rentalListService: RentalListService,
              public pricingService: RentalPricingService,
  ) {
  }

  ngOnInit(): void {
    // const vehicleId = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.details = this.rentalListService.getVehicleById(this.id)
      
      // get price by vehicle grade class
      if (this.details?.grade) {
        this.dailyPrice = this.pricingService.getByGrade(this.details.grade)
      }
    });
  }
}
