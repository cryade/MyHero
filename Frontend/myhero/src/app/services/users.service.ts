import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class UsersService{
    result: any;

  constructor(private http: HttpClient) { }

  logIn(input): Observable<Object>{
      console.log(input);
    return this.http.post<Object>(`/api/users/signIn`, {
        username: input.userName,
        password: input.password
    },
    {withCredentials: true})
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
  
}
