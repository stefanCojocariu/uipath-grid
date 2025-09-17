import { TestBed } from '@angular/core/testing';
import { TGridUtils } from './t-grid.utils';
import { Direction } from '../enums/direction.enum';
import { TColumnComponent } from '../components/t-column/t-column.component';
import { ChessGridData } from '../../chess/models/chess-grid-data.model';
import { signal } from '@angular/core';
import { ColumnDef } from '../models/column-def.model';
import { chessGridDataMock } from '../../chess/mocks/chess-grid-data-mock.spec';

describe('TGridUtils', () => {
  let service: TGridUtils;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TGridUtils],
    });
    service = TestBed.inject(TGridUtils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getSortedRows', () => {
    const rows: ChessGridData[] = chessGridDataMock().slice(0, 4);
    const sortedColumn: ColumnDef<ChessGridData> = {
      name: 'Op',
      property: 'opponent',
      sortable: true,
      sortDirection: Direction.NONE,
    };

    it('should return initial array if direction is none', () => {
      expect(TGridUtils.getSortedRows(rows, sortedColumn)).toEqual(rows);
    });

    describe('number sort', () => {
      it('should sort ascending for column type number', () => {
        sortedColumn.property = 'rating';
        sortedColumn.sortDirection = Direction.ASC;
        const result = [
          {
            id: '3',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op3',
            rating: 600,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '2',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op2',
            rating: 700,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '4',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op4',
            rating: 800,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '1',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op1',
            rating: 951,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
        ];

        expect(TGridUtils.getSortedRows(rows, sortedColumn)).toEqual(result);
      });

      it('should sort descending for column type number', () => {
        sortedColumn.property = 'rating';
        sortedColumn.sortDirection = Direction.DESC;
        const result = [
          {
            id: '1',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op1',
            rating: 951,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },

          {
            id: '4',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op4',
            rating: 800,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '2',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op2',
            rating: 700,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '3',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op3',
            rating: 600,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
        ];

        expect(TGridUtils.getSortedRows(rows, sortedColumn)).toEqual(result);
      });
    });

    describe('string sort', () => {
      it('should sort ascending for column type string', () => {
        sortedColumn.property = 'opponent';
        sortedColumn.sortDirection = Direction.ASC;
        const result = [
          {
            id: '1',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op1',
            rating: 951,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '2',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op2',
            rating: 700,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '3',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op3',
            rating: 600,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '4',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op4',
            rating: 800,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
        ];

        expect(TGridUtils.getSortedRows(rows, sortedColumn)).toEqual(result);
      });

      it('should sort descending for column type string', () => {
        sortedColumn.property = 'opponent';
        sortedColumn.sortDirection = Direction.DESC;
        const result = [
          {
            id: '4',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op4',
            rating: 800,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '3',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op3',
            rating: 600,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '2',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op2',
            rating: 700,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
          {
            id: '1',
            date: '01/11/2024',
            type: 'rapid',
            opponent: 'op1',
            rating: 951,
            result: 'WIN🏆',
            playedAsWhite: 'NO ⚫',
          },
        ];

        expect(TGridUtils.getSortedRows(rows, sortedColumn)).toEqual(result);
      });
    });
  });

  describe('getPaginatedRows', () => {
    const rows: number[] = [1, 2, 3, 4, 5, 6, 7];
    const pageSize = 2;

    it('should get all rows for pagesize null', () => {
      expect(TGridUtils.getPaginatedRows<number>(rows, null, 12)).toEqual(rows);
    });

    it('should get first page', () => {
      expect(TGridUtils.getPaginatedRows<number>(rows, pageSize, 0)).toEqual([1, 2]);
    });

    it('should get a middle page', () => {
      expect(TGridUtils.getPaginatedRows<number>(rows, pageSize, 2)).toEqual([5, 6]);
    });

    it('should get last page', () => {
      expect(TGridUtils.getPaginatedRows<number>(rows, pageSize, 3)).toEqual([7]);
    });

    it('should get empty array if current page doesnt exist', () => {
      expect(TGridUtils.getPaginatedRows<number>(rows, pageSize, 17)).toEqual([]);
    });
  });

  describe('mapTColumnComponentsToColumnDef', () => {
    const tColumns = [
      {
        name: signal('Date'),
        property: signal('date'),
        sortable: signal(false),
        sortDirection: signal(Direction.NONE),
      },
      {
        name: signal('Type'),
        property: signal('type'),
        sortable: signal(true),
        sortDirection: signal(Direction.NONE),
      },
    ] as any as TColumnComponent<ChessGridData>[];
    const columnDefs: ColumnDef<ChessGridData>[] = [
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
    ];

    it('should map TColumns array to ColumnDef array', () => {
      expect(TGridUtils.mapTColumnComponentsToColumnDef(tColumns)).toEqual(columnDefs);
    });

    it('should map single TColumn to ColumnDef array', () => {
      expect(TGridUtils.mapTColumnComponentsToColumnDef(tColumns[1])).toEqual([columnDefs[1]]);
    });
  });

  describe('getNextSortDirection', () => {
    it('should get next sort direction for direction ASC', () => {
      expect(TGridUtils.getNextSortDirection(Direction.ASC)).toBe(Direction.DESC);
    });

    it('should get next sort direction for direction DESC', () => {
      expect(TGridUtils.getNextSortDirection(Direction.DESC)).toBe(Direction.NONE);
    });

    it('should get next sort direction for direction NONE', () => {
      expect(TGridUtils.getNextSortDirection(Direction.NONE)).toBe(Direction.ASC);
    });
  });
});
