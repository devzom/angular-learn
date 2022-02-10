import {Injectable} from '@angular/core';
import vehiclesMock from "../../mock/vehicles";

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  constructor() {
  }

  vehicles: IVehicle[] = []
  availableVehicles: IVehicle[] = []

  fetchVehicles() {
    this.availableVehicles = vehiclesMock
    return this.availableVehicles
  }

  getVehiclesList() {
    return this.vehicles
  }

  getAvailableVehicles() {
    return this.availableVehicles
  }

  setVehicleUnavailable(vehicleId: number) {
    this.availableVehicles = this.availableVehicles.filter(vehicle => vehicle.id !== vehicleId)
    console.log('setVehicleUnavailable: ', {vehicleId, availableVehicles: this.getAvailableVehiclesIds()})
  }

  getAvailableVehiclesIds() {
    return this.getAvailableVehicles().map(item => item?.id)
  }
}
