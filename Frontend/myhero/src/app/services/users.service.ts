import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class UsersService{
    result: any;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User>{
    return this.http.get(`/api/users/currentuser`).pipe(
      map(data => {
        return new User().deserialize(data)
      }),
      catchError(() => throwError('User not found'))
    );;
  }

  logIn(input): Observable<Object>{
  
    return this.http.post<Object>(`/api/users/signIn`, {
        username: input.userName,
        password: input.password
    },
    //needed so cookies get passed along
    {withCredentials: true});
  }

  logOut(){
    return this.http.get(`api/signout`);
  }

  newUser(input): Observable<User>{
      console.log(input);
      return this.http.post<User>(`/api/users/create`, {
        username: input.userName,
        password: input.password,
        firstName:  input.firstName,
        lastName: input.lastName,
        birthdate: input.birthdate,
        street: input.street,
        housenumber: input.houseNr,
        postalcode: input.postalCode,
        city: input.city,
        email: input.email
    })
  }

  editUser(input): Observable<User>{
    return this.http.put<User>(`/api/users/edit`,{
      username: input.userName,
      password: input.password,
      firstName:  input.firstName,
      lastName: input.lastName,
      birthdate: input.birthdate,
      street: input.street,
      housenumber: input.houseNr,
      postalcode: input.postalCode,
      city: input.city,
      email: input.email
    })
  }
  
/* 
* General function for handling http errors. 
* Differentiates between error responses and Error Events.
*/
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};

}