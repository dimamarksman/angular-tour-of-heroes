import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  private heroesUrl = 'api/heroes'; // URL to web api
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    return this.http
      .get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handlerError);
  }

  getHero(id: number): Promise<Hero> {
    const heroDetailUrl = `${this.heroesUrl}/${id}`;
    return this.http
      .get(heroDetailUrl)
      .toPromise()
      .then(response => response.json().data as Hero)
      .catch(this.handlerError);
  }

  updateHero(hero: Hero): Promise<Hero> {
    const heroDetailUrl = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(heroDetailUrl, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.handlerError);
  }

  createHero(name: string): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({name: name}), { headers: this.headers })
      .toPromise()
      .then(response => response.json().data)
      .catch(this.handlerError);
  }

  deleteHero(hero: Hero): Promise<void> {
    const heroDetailUrl = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .delete(heroDetailUrl, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handlerError);
  }

  private handlerError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
