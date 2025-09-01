import { Routes } from '@angular/router';
import { PokemonComponent } from './pokemon.component';

export const POKEMON_ROUTES: Routes = [
  {
    path: ':name',
    component: PokemonComponent,
  },
];
