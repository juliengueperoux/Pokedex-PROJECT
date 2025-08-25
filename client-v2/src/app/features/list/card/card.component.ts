import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../../types/pokemon';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [MatCardModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  pokemon = input.required<Pokemon>();
  pokemonTypes = computed(() => this.pokemon().types.map(t => t.type.name).join(', '));
}
