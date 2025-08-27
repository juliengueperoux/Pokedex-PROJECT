import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';
import { CardComponent } from './card/card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent, PaginationComponent]
})
export class ListComponent {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  private readonly limit = 20;

  page = toSignal(this.route.paramMap.pipe(
    map(params => +(params.get('page') || 1))
  ), { initialValue: 1 });

  private pokemonsResponse$ = this.route.paramMap.pipe(
    map(params => +(params.get('page') || 1)),
    switchMap(page => this.apiService.getPokemonDetailsList(page, this.limit))
  );

  private pokemonsResponse = toSignal(this.pokemonsResponse$);

  listPokemons = computed(() => this.pokemonsResponse()?.pokemons);
  count = computed(() => this.pokemonsResponse()?.count);
  totalPages = computed(() => Math.ceil((this.count() || 0) / this.limit));

  onPageChange(newPage: number) {
    this.router.navigate(['/list', newPage]);
  }
}
