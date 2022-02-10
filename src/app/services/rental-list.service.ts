import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import vehiclesMock from "../../mock/vehicles";

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  constructor() {
  }

  vehicles: IVehicle[] = []
  availableVehicles: IVehicle[] = []
  unavailableVehiclesIds: number[] = []

  fetchVehicles() {
    this.availableVehicles = vehiclesMock
    return this.availableVehicles
  }

  getVehiclesList() {
    return this.vehicles
  }

  getUnavailableVehiclesList() {
    return this.unavailableVehiclesIds
  }

  getAvailableVehicles() {
    return this.availableVehicles
    // return this.unavailableVehiclesIds.length ? this.vehicles.filter(vehicle => !this.unavailableVehiclesIds.includes(<number>vehicle.id))
    //   : this.vehicles
  }

  setVehicleUnavailable(vehicleId: number) {
    console.log({vehicleId})
    this.availableVehicles = this.availableVehicles.filter(vehicle => vehicle.id !== vehicleId)
    this.unavailableVehiclesIds.push(vehicleId)
    console.log('setVehicleUnavailable: ', {vehicleId, availableVehicles: this.getAvailableVehiclesIds()})
  }

  getAvailableVehiclesIds() {
    return this.getAvailableVehicles().map(item => item?.id)
  }
}
