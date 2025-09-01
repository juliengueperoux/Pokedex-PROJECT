import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { Pokemon } from '../../types/pokemon';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    @if (pokemon$ | async; as pokemon) {
      <pre>{{ pokemon | json }}</pre>
    }
  `,
})
export class PokemonComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  pokemon$!: Observable<Pokemon>;

  ngOnInit(): void {
    const pokemonName = this.route.snapshot.paramMap.get('name');
    if (pokemonName) {
      this.pokemon$ = this.apiService.fetchResource(pokemonName, 'pokemon');
    }
  }
}
