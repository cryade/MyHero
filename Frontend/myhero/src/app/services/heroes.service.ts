import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  result: any;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`/api/heroes/`).pipe(
      map(data => data.map(data => new Hero().deserialize(data)))
    );
  }

  getHeroById(id: String): Observable<Hero> {
    return this.http.get<Hero>(`/api/heroes/getData/${id}`).pipe(
      map(data => {
        return new Hero().deserialize(data)
      }),
      catchError(() => throwError('Hero not found'))
    );
  }}
