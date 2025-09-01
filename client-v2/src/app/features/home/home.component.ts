import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { forkJoin, map, Observable, startWith, switchMap } from 'rxjs';
import { PokemonSpecies } from '../../types/pokemon';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NamedAPIResource } from '../../types/utility';

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

  pokemonControl = new FormControl('');
  allPokemons: NamedAPIResource[] = [];
  filteredPokemons$!: Observable<NamedAPIResource[]>;

  ngOnInit(): void {
    const pokemonIds = [1, 4, 7];

    this.featuredPokemon$ = forkJoin(
      pokemonIds.map(id =>
        this.apiService.fetchResource(id, 'pokemon').pipe(
          switchMap(pokemon =>
            this.apiService.fetchByUrl<PokemonSpecies>(pokemon.species.url).pipe(
              map(species => {
                const frenchName = species.names.find((name) => name.language.name === "fr")?.name;
                const frenchDescription = species.flavor_text_entries.find(entry => entry.language.name === 'fr');
                return {
                  name: frenchName ?? "",
                  imageUrl: pokemon.sprites.other?.['official-artwork']?.["front_default"] ?? '',
                  description: frenchDescription?.flavor_text.replace(/\f/g, ' ').replace(/\n/g, ' ') ?? 'Description not available.'
                } as FeaturedPokemon;
              })
            )
          )
        )
      )
    );

    this.apiService.getAllPokemonNames().subscribe(pokemons => {
      this.allPokemons = pokemons;
    });

    this.filteredPokemons$ = this.pokemonControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): NamedAPIResource[] {
    const filterValue = value.toLowerCase();
    return this.allPokemons.filter(pokemon => pokemon.name.toLowerCase().includes(filterValue));
  }

  goToPokemon(pokemonName: string): void {
    this.router.navigate(['/pokemon', pokemonName]);
  }
}