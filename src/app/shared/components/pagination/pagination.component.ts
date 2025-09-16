import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { PageSizeOption } from '../../models/page-size-option.model';

@Component({
  selector: 'pagination',
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  public currentPage = input.required<number>();
  public pageSize = input.required<number | null>();
  public pageSizeOptions = input.required<PageSizeOption[]>();
  public totalPages = input.required<number>();
  public totalRows = input.required<number>();
  public disabled = input<boolean>(false);
  public pageSizeChange = output<number | null>();
  public changePage = output<number>();

  public onChangePage(value: number): void {
    const nextPage = this.currentPage() + value;
    if (nextPage >= 0 && nextPage < this.totalPages()) {
      this.changePage.emit(nextPage);
    }
  }

  public onPageSizeChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    const parsedValue = value === 'null' ? null : parseInt(value);

    this.pageSizeChange.emit(parsedValue);
  }
}
