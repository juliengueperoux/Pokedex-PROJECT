import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import type { Resource, ResourceMap } from "../types";
import { ApiResourceList } from "../types/ApiResouceList";
import { NamedAPIResource } from '../types/utility';
import { Pokemon } from '../types/pokemon';

export const BASE_URI = "https://pokeapi.co/api/v2";

export interface PokemonName {
  fr: string;
  en: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);

  fetchResource<R extends Resource>(param: string | number, resource: R): Observable<ResourceMap[R]> {
    const _param = typeof param === "string" ? param.toLowerCase() : param;
    return this.http.get<ResourceMap[R]>(`${BASE_URI}/${resource}/${_param}`).pipe(
      tap(data => {
        if (!this._isValid(data)) {
          throw new Error(`Invalid data received from ${BASE_URI}/${resource}/${_param}`);
        }
      })
    );
  }

  fetchListResource<T>(resource: string, limit: number = 20, offset: number = 0): Observable<ApiResourceList<T>> {
    const params = new URLSearchParams({ limit: `${limit}`, offset: `${offset}` });
    return this.http.get<ApiResourceList<T>>(`${BASE_URI}/${resource}?${params}`).pipe(
      tap(data => {
        if (!this._isListValid(data)) {
          throw new Error(`Invalid data received from ${BASE_URI}/${resource}?${params}`);
        }
      })
    );
  }

  fetchByUrl<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  fetchPokemonDetailsByUrl(url: string): Observable<Pokemon> {
    return this.fetchByUrl<Pokemon>(url);
  }

  getPokemonDetailsList(page: number = 1, limit: number = 20): Observable<{ pokemons: Pokemon[], count: number }> {
    const offset = (page - 1) * limit;
    return this.fetchListResource<NamedAPIResource>('pokemon', limit, offset).pipe(
      switchMap(response => {
        if (!response.results.length) {
          return of({ pokemons: [], count: response.count });
        }
        const detailRequests = response.results.map(p => this.fetchPokemonDetailsByUrl(p.url));
        return forkJoin(detailRequests).pipe(
          map(pokemons => ({ pokemons, count: response.count }))
        );
      })
    );
  }

  private _isValid(data: any): boolean {
    return "id" in data && "name" in data;
  }

  private _isListValid(data: any): boolean {
    return "results" in data;
  }

  getPokemonNames(): Observable<PokemonName[]> {
    return this.http.get<PokemonName[]>('pokemon-names.json');
  }
}
