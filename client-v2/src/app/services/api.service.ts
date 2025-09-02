import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../types/pokemon';

export interface PokemonName {
  fr: string;
  en: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private pokemons$ = this.http.get<Pokemon[]>('/pokemon-data.json');

  getPokemonDetailsByName(name: string): Observable<Pokemon | undefined> {
    return this.pokemons$.pipe(
      map(pokemons => pokemons.find(p => p.name_en.toLowerCase() === name.toLowerCase()))
    );
  }

  getPokemonDetailsById(id: number): Observable<Pokemon | undefined> {
    return this.pokemons$.pipe(
      map(pokemons => pokemons.find(p => p.id === id))
    );
  }

  getPokemonDetailsList(page: number = 1, limit: number = 20): Observable<{ pokemons: Pokemon[], count: number }> {
    const offset = (page - 1) * limit;
    return this.pokemons$.pipe(
      map(pokemons => ({
        pokemons: pokemons.slice(offset, offset + limit),
        count: pokemons.length
      }))
    );
  }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.pokemons$;
  }

  getPokemonNames(): Observable<PokemonName[]> {
    return this.pokemons$.pipe(
      map(pokemons => pokemons.map(p => ({ fr: p.name, en: p.name_en })))
    );
  }
}
