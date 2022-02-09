import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  vehicles: IVehicle[] = [
    {
      id: 4123123,
      make: 'Volvo',
      model: "V60",
      year: 2021,
      class: 'A',
      imageSrc: '/assets/images/volvo-v60.jpeg'
    },
    {
      id: 51231235,
      make: 'Volvo',
      model: "XC60",
      year: 2019,
      class: 'B',
      imageSrc: '/assets/images/volvo-xc60.jpeg'

    },
    {
      id: 14145123,
      make: 'Volvo',
      model: "V40",
      year: 2017,
      class: 'C',
      imageSrc: '/assets/images/volvo-v40.jpeg'
    }
  ]

  constructor() {

  }

  get vehiclesList() {
    return this.vehicles
  }
}
