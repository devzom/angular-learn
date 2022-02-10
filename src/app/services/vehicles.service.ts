import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  baseHeaders = {
    'x-rapidapi-host': 'car-data.p.rapidapi.com',
    'x-rapidapi-key': environment.API_RAPID_KEY
  }

  constructor(private http: HttpClient,) {
  }

  getCarsMake() {
    return this.http.get(`${environment.BASE_VEHICLES_API}/makes`, {
    // @ts-ignore
      headers: {
        ...this.baseHeaders
      }
    })
  }
}
