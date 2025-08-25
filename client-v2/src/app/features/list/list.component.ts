import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api.service';
import { CardComponent } from './card/card.component';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-list',
  standalone: true,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, CardComponent]
})
export class ListComponent {
  private apiService = inject(ApiService);

  listPokemons = toSignal(this.apiService.getPokemonDetailsList());
}
