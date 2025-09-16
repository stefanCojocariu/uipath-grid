import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ContentChildren,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  QueryList,
  signal,
} from '@angular/core';
import { catchError, finalize, isObservable, Observable, of, switchMap, timer } from 'rxjs';
import { SortChange } from '../../models/sort-change.model';
import { PaginationChange } from '../../models/pagination-change.model';
import { TColumnComponent } from '../t-column/t-column.component';
import { Direction } from '../../enums/direction.enum';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TGridUtils } from '../../utils/t-grid.utils';
import { TProgressComponent } from '../t-progress/t-progress.component';
import { getPageSizeOptions } from '../../consts/page-size-options';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 't-grid',
  templateUrl: './t-grid.component.html',
  styleUrl: './t-grid.component.scss',
  standalone: true,
  imports: [FormsModule, PaginationComponent, TProgressComponent, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TGridComponent<T> {
  public columns = contentChildren(TColumnComponent, { read: TColumnComponent<T> });

  readonly #destroyRef = inject(DestroyRef);

  public data = input.required<T[] | Observable<T[]>>();
  public sortable = input.required<boolean>();
  public pageSize = input<number | null>();
  public sortChange = output<SortChange>();
  public paginationChange = output<PaginationChange>();

  readonly #rows = signal<T[]>([]);
  readonly #pageSize = signal<number | null>(null);
  readonly #currentPage = signal(0);
  readonly #shouldSort = signal(false);
  readonly #shouldPaginate = signal(false);
  readonly #currentSort = signal<SortChange | null>(null);
  readonly #progress = signal(0);
  private readonly requestDelay = 3000;

  public readonly viewRows = computed(() => {
    const rows = this.#rows();

    if (!rows?.length) {
      return rows;
    }

    return this.getViewRows(rows);
  });
  public readonly totalRows = computed(() => {
    return this.#rows().length;
  });
  public readonly totalPages = computed(() => {
    const pageSize = this.#pageSize();
    if (!pageSize) {
      return 1;
    }

    return Math.ceil(this.#rows().length / pageSize);
  });
  public readonly currentPage = this.#currentPage.asReadonly();
  public readonly currentPageSize = this.#pageSize.asReadonly();

  public readonly progress = this.#progress.asReadonly();
  public readonly pageSizeOptions = getPageSizeOptions();
  public readonly Direction = Direction;

  constructor() {
    effect(() => this.syncData());
    effect(() => this.syncPageSize());

    this.startProgress();
  }

  public columnTrackBy(index: number, column: TColumnComponent<T>): string {
    return (column.property() as string) ?? index.toString();
  }

  public rowTrackBy(index: number, row: T): string {
    return ((row as any).id as string) ?? index.toString();
  }

  public onChangePage(value: number): void {
    this.#currentPage.set(value);
    this.#shouldPaginate.set(true);
    this.emitPaginationChange();
  }

  public onPageSizeChange(value: number | null): void {
    this.#pageSize.set(value);
    this.#currentPage.set(0);
    this.#shouldPaginate.set(true);
    this.emitPaginationChange();
  }

  public emitPaginationChange(): void {
    this.paginationChange.emit({
      pageSize: this.#pageSize(),
      currentPage: this.#currentPage(),
    });
  }

  public onSortChange(selectedColumn: TColumnComponent<T>): void {
    if (!this.sortable() || !selectedColumn.sortable()) {
      return;
    }

    const currentSort: SortChange = {
      columnName: selectedColumn.name(),
      direction: TGridUtils.getNextSortDirection(selectedColumn.sortDirection()),
    };
    this.#currentSort.set(currentSort);
    this.#currentPage.set(0);
    this.#shouldSort.set(true);
    this.sortChange.emit(currentSort);
  }

  private getViewRows(rows: T[]): T[] {
    let processedRows = [...rows];

    const currentSort = this.#currentSort();
    if (this.#shouldSort() && currentSort) {
      const sortedColumn = this.columns().find((column) => column.name() == currentSort.columnName);
      if (!sortedColumn) {
        return processedRows;
      }
      const [columnDef] = TGridUtils.mapTColumnComponentsToColumnDef<T>(sortedColumn);
      processedRows = TGridUtils.getSortedRows<T>(processedRows, columnDef);
    }

    if (this.#shouldPaginate()) {
      processedRows = TGridUtils.getPaginatedRows<T>(
        processedRows,
        this.#pageSize(),
        this.#currentPage()
      );
    }

    return processedRows;
  }

  private syncData(): void {
    const rows = this.data();

    if (isObservable(rows)) {
      timer(this.requestDelay)
        .pipe(
          switchMap(() => rows),
          catchError((err) => {
            console.log('Failed to get data', err);

            return of([] as T[]);
          }),
          finalize(() => this.#progress.set(100)),
          takeUntilDestroyed(this.#destroyRef)
        )
        .subscribe((rows) => this.#rows.set(rows));
    } else {
      this.#rows.set(rows as T[]);
    }
  }

  private syncPageSize(): void {
    const pageSize = this.pageSize() ?? null;
    const exists = this.pageSizeOptions.find((o) => o.value === pageSize);
    const selectedValue = exists ? pageSize : null;

    this.#pageSize.set(selectedValue);
    this.#currentPage.set(0);
  }

  private startProgress(): void {
    const intervalTime = 500;
    const progessStep = (intervalTime / this.requestDelay) * 100;
    const intervalId = setInterval(() => {
      const nextProgress = this.#progress() + progessStep;
      if (nextProgress >= 100) {
        this.#progress.set(100);
        clearInterval(intervalId);
      } else {
        this.#progress.set(nextProgress);
      }
    }, intervalTime);
  }
}
