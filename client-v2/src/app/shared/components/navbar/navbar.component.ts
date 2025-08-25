import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MobileDetectionService } from '../../../services/utils/mobile-detection.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  readonly mobileService = inject(MobileDetectionService);

  navLinks = input.required<{ path: string, label: string }[]>();

  toggleSidenav = output<void>();

  onToggle(): void {
    this.toggleSidenav.emit();
  }
}
