import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { TColumnComponent } from '../../../shared/components/t-column/t-column.component';
import { TGridComponent } from '../../../shared/components/t-grid/t-grid.component';
import { ChessService } from '../../../api/chess/services/chess.service';
import { ChessGridService } from '../../services/chess-grid.service';
import { ColumnDef } from '../../../shared/models/column-def.model';
import { Direction } from '../../../shared/enums/direction.enum';
import { ChessGridData } from '../../models/chess-grid-data.model';
import { SortChange } from '../../../shared/models/sort-change.model';
import { PaginationChange } from '../../../shared/models/pagination-change.model';

@Component({
  selector: 'chess-grid-component',
  imports: [TGridComponent, TColumnComponent],
  providers: [ChessService, ChessGridService],
  templateUrl: './chess-grid.component.html',
  styleUrl: './chess-grid.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChessGridComponent {
  readonly #chessGridService = inject(ChessGridService);

  public readonly chessGridData$ = this.#chessGridService.getChessGridData();
  readonly #columns = signal<ColumnDef<ChessGridData>[]>([
    {
      name: 'Date',
      property: 'date',
      sortable: false,
      sortDirection: Direction.ASC,
    },
    {
      name: 'Type',
      property: 'type',
      sortable: false,
      sortDirection: Direction.NONE,
    },
    {
      name: 'Opponent',
      property: 'opponent',
      sortable: true,
      sortDirection: Direction.NONE,
    },
    {
      name: 'Result',
      property: 'result',
      sortable: true,
      sortDirection: Direction.NONE,
    },
    {
      name: 'Rating',
      property: 'rating',
      sortable: true,
      sortDirection: Direction.NONE,
    },
    {
      name: 'White',
      property: 'playedAsWhite',
      sortable: true,
      sortDirection: Direction.NONE,
    },
  ]);

  public readonly columns = this.#columns.asReadonly();

  public onSortChange(sortChange: SortChange): void {
    this.#columns.update((columns) =>
      columns.map((column) => ({
        ...column,
        sortDirection: column.name == sortChange.columnName ? sortChange.direction : Direction.NONE,
      }))
    );
    console.log('[UIPATH] Parent sort change:', sortChange);
  }

  public onPaginationChange(paginationChange: PaginationChange): void {
    console.log('[UIPATH] Parent pagination change:', paginationChange);
  }
}
