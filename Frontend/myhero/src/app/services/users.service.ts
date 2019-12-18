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

  getCurrentUser(): Observable<User>{
    return this.http.get(`/api/users/currentuser`).pipe(
      map(data => {
        return new User().deserialize(data)
      }),
      catchError(() => throwError('User not found'))
    );;
  }

  logIn(input): Observable<Object>{
      console.log(input);
    return this.http.post<Object>(`/api/users/signIn`, {
        username: input.userName,
        password: input.password
    },
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
  
}
