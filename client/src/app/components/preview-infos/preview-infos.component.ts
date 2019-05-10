import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemonService/pokemon.service'
import { Pokemon } from 'src/app/models/pokemon';
import {HttpService} from '../../services/httpService/http.service'
import { Stat } from 'src/app/models/stat';
import {UtilsService} from '../../services/utilsService/utils.service';

@Component({
  selector: 'app-preview-infos',
  templateUrl: './preview-infos.component.html',
  styleUrls: ['./preview-infos.component.css']
})
export class PreviewInfosComponent implements OnInit {

  selectedPokemon : Pokemon
  constructor(private pokemonService: PokemonService,private httpService: HttpService,private _utils: UtilsService) { }

  ngOnInit() {
    this.pokemonService.currentPokemon.subscribe((pokemon:string)=>{
      if(pokemon){
      this.httpService.getPokemon(pokemon).subscribe((pokemonDatas:any)=>{
        this.selectedPokemon = new Pokemon()
        if(pokemonDatas){
        this.selectedPokemon.id = pokemonDatas.id
        this.selectedPokemon.name = pokemonDatas.name
        this.selectedPokemon.abilities=pokemonDatas.abilities.map((abilitie)=> abilitie.name)
        this.selectedPokemon.stats = pokemonDatas.stats.map((stat)=> new Stat(stat.stat.name,stat.base_stat))
        this.selectedPokemon.type = pokemonDatas.types.map((type)=>type.type.name)
        this.selectedPokemon.image = pokemonDatas.sprites.front_default
        this.httpService.getPokemonDescription(pokemonDatas.species.url).subscribe((pokemonSpecies:any)=>{
          this.selectedPokemon.description= pokemonSpecies.flavor_text_entries.filter(flavorTextEntry => flavorTextEntry.language.name === "en")[0].flavor_text;
        })
        }
      },error => this._utils.openSnackBar("identifiant ou nom du pokemon incorrect","Ok","error-snackbar"))
    }
    })
  }

  barColor(value){
    if (value < 50) return "superLowStat"
    if (value < 100) return "lowStat"
    if (value < 175) return "middleStat"
    if (value >=175) return "highStat"
  }

}
