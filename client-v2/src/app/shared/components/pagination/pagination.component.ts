import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  imports: [MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  @Output() pageChange = new EventEmitter<number>();

  previousPage() {
    this.pageChange.emit(this.currentPage() - 1);
  }

  nextPage() {
    this.pageChange.emit(this.currentPage() + 1);
  }
}
