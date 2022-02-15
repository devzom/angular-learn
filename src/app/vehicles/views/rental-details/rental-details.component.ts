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
  details$: Observable<any> | undefined;
  details: any;
  id: number | undefined

  constructor(private route: ActivatedRoute,
              private router: Router,
              private rentalListService: RentalListService,
              public pricingService: RentalPricingService,
  ) {
  }

  ngOnInit(): void {

    const vehicleId = this.route.snapshot.paramMap.get('id');

    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.details = this.rentalListService.getVehicleById(this.id)
    });


  }

}
