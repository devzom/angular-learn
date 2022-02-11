import {Injectable} from '@angular/core';
import vehiclesMock from "../../mock/vehicles";

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  constructor() {
  }

  vehicles: IVehicle[] = vehiclesMock
  availableVehicles: IVehicle[] = []

  fetchVehicles() {
    this.availableVehicles = vehiclesMock
    return this.availableVehicles
  }

  getVehiclesList() {
    return this.vehicles
  }


  getVehicleById(id: any) {
    if (Number(id)) {
      return this.vehicles.filter(vehicle => vehicle.id == id)[0]
    }

    return null
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
