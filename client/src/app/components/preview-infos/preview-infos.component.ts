import { Component, OnInit, Input } from '@angular/core';
import { PokemonService } from '../../services/pokemonService/pokemon.service'
import { Pokemon } from 'src/app/models/pokemon';
import { HttpService } from '../../services/httpService/http.service'
import { Stat } from 'src/app/models/stat';
import { UtilsService } from '../../services/utilsService/utils.service';
import domtoimage from 'dom-to-image';
@Component({
  selector: 'app-preview-infos',
  templateUrl: './preview-infos.component.html',
  styleUrls: ['./preview-infos.component.css']
})
export class PreviewInfosComponent implements OnInit {
  @Input() defaultpokemon: Pokemon;
  indexImage: number = 0
  selectedPokemon: Pokemon
  constructor(private pokemonService: PokemonService, private httpService: HttpService, private _utils: UtilsService) { }

  ngOnInit() {
    if(!this.defaultpokemon){
    this.pokemonService.currentPokemon.subscribe((pokemon: string) => {
      if (pokemon) {
        this.httpService.getPokemon(pokemon).subscribe((pokemonDatas: any) => {
          this.selectedPokemon = new Pokemon()
          if (pokemonDatas) {
            this.selectedPokemon.id = pokemonDatas.id
            this.selectedPokemon.name = pokemonDatas.name
            this.selectedPokemon.abilities = pokemonDatas.abilities.map((abilitie) => abilitie.name)
            this.selectedPokemon.stats = pokemonDatas.stats.map((stat) => new Stat(stat.stat.name, stat.base_stat))
            this.selectedPokemon.type = pokemonDatas.types.map((type) => type.type.name)
            this.selectedPokemon.images = [pokemonDatas.sprites.front_default, pokemonDatas.sprites.back_default]
            this.selectedPokemon.images = this.selectedPokemon.images.filter((image) => image != null)
            this.httpService.getPokemonDescription(pokemonDatas.species.url).subscribe((pokemonSpecies: any) => {
              this.selectedPokemon.description = pokemonSpecies.flavor_text_entries.filter(flavorTextEntry => flavorTextEntry.language.name === "en")[0].flavor_text;
            })
          }
        }, error => this._utils.openSnackBar("identifiant ou nom du pokemon incorrect", "Ok", "error-snackbar"))
      }
    })
  }
  else{
    this.selectedPokemon = this.defaultpokemon
  }
  }

  changeImage() {
    this.indexImage == (this.selectedPokemon.images.length - 1) ? this.indexImage = 0 : this.indexImage = this.indexImage + 1
  }

  barColor(value) {
    if (value < 50) return "superLowStat"
    if (value < 100) return "lowStat"
    if (value < 175) return "middleStat"
    if (value >= 175) return "highStat"
  }

  savePokemon() {
    domtoimage.toPng(document.getElementById('pokemonCard'), { quality: 1 })
      .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'myOwnPokemon.png';
        link.href = dataUrl;
        link.click();
      });

  }
}
