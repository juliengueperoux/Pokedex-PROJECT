import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../../types/pokemon';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports: [MatCardModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  pokemon = input.required<Pokemon>();
  private router = inject(Router);

  pokemonTypes = computed(() => this.pokemon().types.map(t => (t.type as any).name_fr));

  navigateToDetails() {
    this.router.navigate(['/pokemon', this.pokemon().name_en]);
  }
}
