import {Injectable} from '@angular/core';
import vehiclesMock from "../../../mock/vehicles";

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  constructor() {
  }

  vehicles: IVehicle[] = vehiclesMock
  availableVehicles: IVehicle[] = []

  filters = [
    {
      parameter: 'grade',
      name: 'Car class',
      type: 'radio',
      options: ['A', 'B', 'C']
    },
    {
      parameter: 'engine_type',
      name: 'Engine type',
      type: 'radio',
      options: ['diesel', 'gasoline', 'gas', 'hybrid', 'electric']
    },
    {
      parameter: 'sort',
      name: 'Sort',
      type: 'sort',
      options: [
        {
          name: 'Price ascending',
          parameter: 'price',
          value: 'asc'
        },
        {
          name: 'Price descending',
          parameter: 'price',
          value: 'desc'
        },
        {
          name: 'Year ascending',
          parameter: 'year',
          value: 'asc'
        },
        {
          name: 'Year descending',
          parameter: 'year',
          value: 'desc'
        }
      ]
    }
  ]


  getFiltersByType(type: string) {
    return this.filters.filter(filter => filter.type === type)
  }


  fetchVehicles() {
    this.availableVehicles = this.vehicles
    return this.availableVehicles
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
