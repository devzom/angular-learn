import {Injectable} from '@angular/core';
import vehiclesMock from "../../../mock/vehicles";
import {BehaviorSubject, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

const initData: any[] = [];

// const baseURL = "https://jsonplaceholder.typicode.com"

@Injectable({
  providedIn: 'root'
})
export class RentalListService {

  vehicles: any = of([]);
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
      options: ['diesel', 'gasoline', 'hybrid', 'electric']
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
  availableVehicles: IVehicle[] = []
  private DataStore: any = new BehaviorSubject(initData)
  data$: Observable<any> = this.DataStore.asObservable()

  constructor(private http: HttpClient) {
  }


  // loadTodos() {
  //   this.http.get(`${baseURL}/todos/1`)
  //     .subscribe(data => {
  //       this.DataStore.next(data)
  //     })
  // }

  loadVehiclesData() {
    this.vehicles.subscribe((data: any) => {
      console.log('Run vehicle subscribe: ', data)
      this.DataStore.next(data)
    })

    console.log('Class: RentalListService, Function: loadVehiclesData, Line 80 | this.vehicles, Expected:(): '
      , this.data$);
  }

  getFiltersByType(type: string) {
    return this.filters.filter(filter => filter.type === type)
  }


  fetchVehicles() {
    this.vehicles = vehiclesMock
    this.availableVehicles = this.vehicles
    return this.availableVehicles
  }

  getVehicleById(id: any) {
    this.vehicles = vehiclesMock
    let result = {}

    if (id) {
      result = this.vehicles.filter((vehicle: { id: any; }) => vehicle.id == id)[0]
    }

    return result
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
