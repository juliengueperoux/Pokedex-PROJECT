import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpService} from '../httpService/http.service'
import { Pokemon } from 'src/app/models/pokemon';
@Injectable()
export class PokemonService {

  // tous les pokemons
  private pokemons:Pokemon[]

  // pokemon selectionné par l'utilisateur
  private pokemonSource = new BehaviorSubject('');
  currentPokemon = this.pokemonSource.asObservable();

  constructor(private httpService:HttpService) {
    this.pokemons=[]
    this.httpService.getAllPokemons().subscribe((pokemonsData:any) => {
      pokemonsData.results.forEach((pokemon,index)=>{
        this.pokemons.push(new Pokemon(index+1,pokemon.name))
      })
    })

   }

   getPokemons(){
     return this.pokemons
   }

  changePokemon(pokemon: string) {
    this.pokemonSource.next(pokemon)
  }

}