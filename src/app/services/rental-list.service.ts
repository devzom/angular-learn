import {Injectable} from '@angular/core';
import vehiclesMock from "../../mock/vehicles";

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  constructor() {
  }

  vehicles: IVehicle[] = vehiclesMock


  get vehiclesList() {
    return this.vehicles
  }
}
