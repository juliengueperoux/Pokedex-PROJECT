import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatChipsModule, CommonModule],
})
export class PokemonComponent {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  private pokemon$ = this.route.paramMap.pipe(
    map(params => params.get('name')!),
    switchMap(name => this.apiService.getPokemonDetailsByName(name))
  );

  pokemon = toSignal(this.pokemon$);

  pokemonTypes = computed(() => this.pokemon()?.types.map(t => (t.type as any).name_fr));
}