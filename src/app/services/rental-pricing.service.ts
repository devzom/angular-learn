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

  getByClass(_class: any) {
    if (!_class) return 0
    return this.pricing[_class]
  }

}
