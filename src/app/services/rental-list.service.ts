import {Injectable} from '@angular/core';
import vehiclesMock from "../../mock/vehicles";

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  constructor() {
  }

  unavailableVehiclesIds: number[] = []
  private vehicles: IVehicle[] = vehiclesMock

  get vehiclesList() {
    return this.vehicles
  }

  getAvailableVehicles() {
    return this.unavailableVehiclesIds.length ? this.vehicles.filter(vehicle => !this.unavailableVehiclesIds.includes(<number>vehicle.id))
      : this.vehicles
  }

  getAvailableVehiclesIds() {
    return this.getAvailableVehicles().map(item => item.id)
  }
}
