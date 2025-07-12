import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemonService/pokemon.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
    standalone: false
})
export class SearchComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.resetPokemon();
  }

  resetPokemon() {
    this.pokemonService.changePokemon('');
}

}
