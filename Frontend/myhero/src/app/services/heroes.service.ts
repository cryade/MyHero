import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { Rating } from '../models/rating.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

/*
* The service responsible for making http-requests related to heroes
*/

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  result: any;

  constructor(private http: HttpClient) { }

  /* gets a list of all heroes in the database and maps them into a new array in a more usable format */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`/api/heroes/`).pipe(
      map(data => data.map(data => new Hero().deserialize(data)))
    );
  }

  /* takes an id as input and returns the corresponding hero object*/
  getHeroById(id: String): Observable<Hero> {
    return this.http.get<Hero>(`/api/heroes/getData/${id}`).pipe(
      map(data => {
        return new Hero().deserialize(data)
      }),
      catchError((error) => throwError('There was a problem finding that hero'))
    );
  }

  /* adds a rating for a hero from the currently logged in user */
  rateHero(heroID, rating){
    return this.http.post(`/api/ratings/rate/${heroID}`, {
      title: rating.title,
      description: rating.comment,
      rating: rating.starRating
    })/*, error=> {
      if (error.status = 500) console.log("Failed to save the rating properly");
      else if (error.status = 400) console.log("Tried rating a hero that does not exist");
      else console.log("An error occured: ", error.body)
    } >-- i couldn't use subscribe on the method with this, and i had no time to check/learn why*/
  }

  /* adds a hero to the list of heroes the currently logged in user has booked before*/
  bookHero(heroID){
    return this.http.post(`api/users/bookHero/${heroID}`, {}).subscribe(result =>{
      console.log(result)
    })
  }
}

  
