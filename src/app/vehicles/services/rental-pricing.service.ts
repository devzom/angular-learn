import {Injectable} from '@angular/core';

type TVehicleClassPricing = {
  [key: string]: number
}

@Injectable({
  providedIn: 'root'
})
export class RentalPricingService {
  pricing: TVehicleClassPricing = {
    'A': 120, 'B': 99, 'C': 79
  }

  public currency = "USD"

  constructor() {
  }

  getByGrade(grade: any) {
    console.log({grade})
    return !grade ? 0 : this.pricing?.[grade]
  }
}
