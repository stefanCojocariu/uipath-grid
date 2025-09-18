import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TColumnComponent } from '../../../shared/components/t-column/t-column.component';
import { TGridComponent } from '../../../shared/components/t-grid/t-grid.component';
import { ChessGridService } from '../../services/chess-grid.service';
import { ColumnDef } from '../../../shared/models/column-def.model';
import { Direction } from '../../../shared/enums/direction.enum';
import { ChessGridData } from '../../models/chess-grid-data.model';
import { SortChange } from '../../../shared/models/sort-change.model';
import { PaginationChange } from '../../../shared/models/pagination-change.model';
import { ChessService } from '../../../api/chess/services/chess.service';

@Component({
  selector: 'chess-grid-component',
  imports: [TGridComponent, TColumnComponent],
  providers: [ChessGridService, ChessService],
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
      sortDirection: Direction.NONE,
    },
    {
      name: 'Type',
      property: 'type',
      sortable: true,
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

  public columnTrackBy<T>(index: number, column: ColumnDef<ChessGridData>): string {
    return (column.property as string) ?? index.toString();
  }

  public onSortChange(sortChange: SortChange): void {
    console.log('[UIPATH] Parent sort change:', sortChange);
  }

  public onPaginationChange(paginationChange: PaginationChange): void {
    console.log('[UIPATH] Parent pagination change:', paginationChange);
  }
}
