import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoint: string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  authTokenName: string = "access_token"
  userTokenName: string = "angular_user"


  /*
  * Used auth for this frontend:
  * https://github.com/devzom/node-token-based-authentication
  * */


  constructor(private http: HttpClient, public router: Router) {
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem(this.authTokenName);
    return authToken !== null;
  }

  // Sign-up
  signUp(user: IUser): Observable<any> {
    const api = `${this.endpoint}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: IUser) {
    return this.http
      .post<any>(`${this.endpoint}/signin`, user)
      .subscribe((res: any) => {
        const userId = res.userId
        this.setToken(res.token)
        this.setUserId(userId)

        this.getUserProfile(userId).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate([`profile`]);
        });
      });
  }

  setUserId(userId: string) {
    localStorage.setItem(this.userTokenName, userId);
  }

  getUserId() {
    return localStorage.getItem(this.userTokenName);
  }

  removeUserId() {
    return localStorage.removeItem(this.userTokenName);
  }

  setToken(token: string) {
    localStorage.setItem(this.authTokenName, token);
  }

  getToken() {
    return localStorage.getItem(this.authTokenName);
  }

  removeToken() {
    return localStorage.removeItem(this.authTokenName);
  }

  // User profile
  getUserProfile(id?: any): Observable<any> {
    let userId = id
    if (!userId) {
      userId = this.getUserId()
    }

    const api = `${this.endpoint}/user-profile/${userId}`;
    const authToken = `Bearer ${this.getToken()}`

    if (!authToken) {
      throw Error('Cannot get Authorization token')
    }

    return this.http.get(api, {headers: {...this.headers, Authorization: authToken}}).pipe(
      map((res) => {
        return res || {};
      }),

      catchError(this.handleError)
    );
  }


  doLogout() {
    const removeToken = this.removeToken()
    const removeUser = this.removeUserId()

    if (removeToken == null && removeUser == null) {
      this.router.navigate(['login']);
    } else {
      throw new Error('Cannot logout')
    }
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
