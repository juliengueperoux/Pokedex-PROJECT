import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { CreatePokemonComponent } from './components/create-pokemon/create-pokemon.component';
import { ListPokemonsComponent } from './components/list-pokemons/list-pokemons.component';

const routes: Routes = [
  { path: '',  redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: SearchComponent},
  { path: 'create', component: CreatePokemonComponent},
  { path: 'list', component: ListPokemonsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
