import { Injectable } from '@angular/core';
import { Hero } from '../models/hero.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  result: any;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`/api/hero/`).pipe(
      map(data => data.map(data => new Hero().deserialize(data)))
    );
  }

  getHeroById(id: String): Observable<Hero> {
    return this.http.get<Hero>(`/api/hero/getData/${id}`).pipe(
      map(data => new Hero().deserialize(data)));
  }
}
