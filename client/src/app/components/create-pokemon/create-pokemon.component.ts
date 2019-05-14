import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utilsService/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Pokemon } from 'src/app/models/pokemon';
import { Stat } from 'src/app/models/stat';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.css']
})
export class CreatePokemonComponent implements OnInit {
  imageUrl: any[];
  filledCustomPokemon : boolean;
  pokemonGroup: FormGroup;
  customPokemon : Pokemon;
  constructor(private _utils: UtilsService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.filledCustomPokemon = false
    this.imageUrl=[]
    this.pokemonGroup = this._formBuilder.group({
      inputNameControl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30)
        ])
      ],
      inputDescriptionControl: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100)
        ])
      ],
      inputTypesControl: ['',
        Validators.required
      ],
      inputHpControl: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0),
          Validators.max(255)
        ])
      ],
      inputAttackControl: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0),
          Validators.max(255)
        ])
      ],
      inputSpeedControl: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0),
          Validators.max(255)
        ])
      ],
      inputSpeAttackControl: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0),
          Validators.max(255)
        ])
      ],
      inputSpeDefenseControl: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0),
          Validators.max(255)
        ])
      ],
      inputDefenseControl: ['',
        Validators.compose([
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.min(0),
          Validators.max(255)
        ])
      ]
    })
  }
  uploadImagePokemon(event: any) {
    if (event.target.files && event.target.files[0]) {
      if (event.target.files[0].type.includes('image/')) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.imageUrl = [event.target.result];
        }
        reader.readAsDataURL(event.target.files[0]);
      }
      else {
        this.imageUrl = ['']
        this._utils.openSnackBar("Le fichier n'est pas une image", "Ok", "error-snackbar")
      }
    }
  }
  createPokemon():void{
    console.log("subbbmit "+this.pokemonGroup.valid)
    if(this.pokemonGroup.valid){
      if(this.imageUrl.length>0){
        this.customPokemon = new Pokemon()
        this.customPokemon.id = null
            this.customPokemon.name = this.pokemonGroup.get('inputNameControl').value
            this.customPokemon.abilities = null
            this.customPokemon.stats = [new Stat("speed",this.pokemonGroup.get('inputSpeedControl').value),new Stat("hp",this.pokemonGroup.get('inputHpControl').value),new Stat("attack",this.pokemonGroup.get('inputAttackControl').value),new Stat("defense",this.pokemonGroup.get('inputDefenseControl').value),new Stat("special-defense",this.pokemonGroup.get('inputSpeDefenseControl').value),new Stat("special-attack",this.pokemonGroup.get('inputSpeAttackControl').value)]
            this.customPokemon.type = this.pokemonGroup.get('inputTypesControl').value
            this.customPokemon.images = this.imageUrl
            this.customPokemon.description = this.pokemonGroup.get('inputDescriptionControl').value

      this.filledCustomPokemon = true
      }
      else{
        this._utils.openSnackBar("Formulaire invalide", "Ok", "error-snackbar")
      }
      }
      else{
        this._utils.openSnackBar("Formulaire invalide", "Ok", "error-snackbar")
      }
    }

    resetCustomPokemon(){
      this.filledCustomPokemon = false
      this.imageUrl = []
      this.pokemonGroup.reset()
    }

    openFileBrowser(){ 
      document.getElementById("fileInput").click();
    }
  }
