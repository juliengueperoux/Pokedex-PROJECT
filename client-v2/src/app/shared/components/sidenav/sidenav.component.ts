import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, MatListModule],
  templateUrl: './sidenav.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  navLinks = input.required<{path: string, label: string}[]>();
  linkClicked = output<void>();

  onLinkClicked(): void {
    this.linkClicked.emit();
  }
}
