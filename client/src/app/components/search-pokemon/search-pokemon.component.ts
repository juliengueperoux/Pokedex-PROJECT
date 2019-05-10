import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemonService/pokemon.service'
import {startWith,map} from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.css']
})
export class SearchPokemonComponent implements OnInit {

  pokemonCtrl = new FormControl();
  filteredPokemons: Observable<Pokemon[]>;
  pokemons : Pokemon[]

  constructor(private pokemonService: PokemonService) {

    this.filteredPokemons = this.pokemonCtrl.valueChanges
      .pipe(
        startWith(''),
        map(pokemon => pokemon ? this._filterPokemons(pokemon) : this.pokemons.slice())
      );

   }

  ngOnInit() {
    this.pokemons = this.pokemonService.getPokemons()
  }

  private _filterPokemons(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();

    return this.pokemons.filter(pokemon => pokemon.name.toLowerCase().indexOf(filterValue) === 0|| String(pokemon.id).indexOf(filterValue) === 0);
  }

  submitPokemon(){
      this.pokemonService.changePokemon(this.pokemonCtrl.value)
  }

}
