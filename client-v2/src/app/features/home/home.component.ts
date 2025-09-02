import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiService, PokemonName } from '../../services/api.service';
import { forkJoin, map, Observable, startWith } from 'rxjs';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

export interface FeaturedPokemon {
  name: string;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    TitleCasePipe,
    ReactiveFormsModule,
    MatAutocompleteModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private apiService = inject(ApiService);
  private router = inject(Router);

  featuredPokemon$!: Observable<FeaturedPokemon[]>;

  pokemonControl = new FormControl<string | PokemonName>('');
  allPokemons: PokemonName[] = [];
  filteredPokemons$!: Observable<PokemonName[]>;

  ngOnInit(): void {
    const pokemonIds = [1, 4, 7];

    this.featuredPokemon$ = forkJoin(
      pokemonIds.map(id => this.apiService.getPokemonDetailsById(id).pipe(
        map(pokemon => {
          if (!pokemon) {
            return {
              name: 'Not Found',
              imageUrl: '',
              description: ''
            };
          }
          return {
            name: pokemon.name,
            imageUrl: pokemon.sprites['front_default'] ?? '',
            description: pokemon.description.replace(/\f/g, ' ').replace(/\n/g, ' ')
          } as FeaturedPokemon;
        })
      ))
    );

    this.apiService.getPokemonNames().subscribe(pokemons => {
      this.allPokemons = pokemons;
    });

    this.filteredPokemons$ = this.pokemonControl.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.fr;
        return name ? this._filter(name) : this.allPokemons.slice();
      }),
    );
  }

  displayFn(pokemon: PokemonName): string {
    return pokemon && pokemon.fr ? pokemon.fr : '';
  }

  private _filter(value: string): PokemonName[] {
    const filterValue = value.toLowerCase();
    return this.allPokemons.filter(pokemon => pokemon.fr.toLowerCase().includes(filterValue));
  }

  goToPokemon(): void {
    const pokemon = this.pokemonControl.value;
    if (typeof pokemon === 'object' && pokemon !== null) {
      this.router.navigate(['/pokemon', pokemon.en.toLowerCase()]);
    }
  }
}
