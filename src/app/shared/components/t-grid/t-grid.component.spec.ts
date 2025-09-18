import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TGridComponent } from './t-grid.component';
import { ChessGridData } from '../../../chess/models/chess-grid-data.model';
import { MockComponents, MockModule, MockProvider, ngMocks } from 'ng-mocks';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../pagination/pagination.component';
import { TProgressComponent } from '../t-progress/t-progress.component';
import { CommonModule } from '@angular/common';
import { ComponentRef, signal } from '@angular/core';
import { chessGridDataMock } from '../../../chess/mocks/chess-grid-data-mock.spec';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { TGridUtils } from '../../utils/t-grid.utils';
import { ColumnDef } from '../../models/column-def.model';
import { Direction } from '../../enums/direction.enum';
import { TColumnComponent } from '../t-column/t-column.component';

describe('TGridComponent', () => {
  let component: TGridComponent<ChessGridData>;
  let fixture: ComponentFixture<TGridComponent<ChessGridData>>;
  let componentRef: ComponentRef<TGridComponent<ChessGridData>>;
  let data: ChessGridData[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TGridComponent,
        MockModule(FormsModule),
        MockModule(CommonModule),
        MockComponents(PaginationComponent, TProgressComponent),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TGridComponent<ChessGridData>);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    data = chessGridDataMock();

    componentRef.setInput('data', data);
    componentRef.setInput('sortable', true);
    componentRef.setInput('pageSize', 10);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('totalRows', () => {
    it('should get total rows', () => {
      fixture.detectChanges();

      expect(component.totalRows()).toBe(data.length);
    });
  });

  describe('totalPages', () => {
    it('should return 1 when page size is null', () => {
      componentRef.setInput('pageSize', null);
      fixture.detectChanges();

      expect(component.totalPages()).toBe(1);
    });

    it('should return 2 when page size is 5', () => {
      componentRef.setInput('pageSize', 5);
      fixture.detectChanges();

      expect(component.totalPages()).toBe(2);
    });
  });

  describe('syncData', () => {
    it('should set viewRows with initial rows if data input is empty array', () => {
      componentRef.setInput('data', []);
      fixture.detectChanges();

      expect(component.viewRows()).toEqual([]);
    });

    it('should set viewRows with rows, if data input is observable', () => {
      const expected = [data[0]];
      componentRef.setInput('data', of(expected));

      fixture.detectChanges();

      expect(component.viewRows()).toEqual(expected);
    });

    it('should set viewRows with empty array if data observable input throws err', () => {
      componentRef.setInput(
        'data',
        throwError(() => new Error('test-err'))
      );
      fixture.detectChanges();

      expect(component.viewRows()).toEqual([]);
    });
  });

  describe('syncPageSize', () => {
    it('should call getPaginatedRows when page size input is changed and doesnt exist', () => {
      componentRef.setInput('pageSize', 255);
      fixture.detectChanges();

      expect(component.currentPageSize()).toBe(null);
    });

    it('should call getPaginatedRows when page size input is changed and exists', () => {
      componentRef.setInput('pageSize', 5);
      fixture.detectChanges();

      expect(component.currentPageSize()).toBe(5);
    });
  });

  describe('onChangePage', () => {
    it('should set current page to value and emit pagination change', () => {
      const spy = spyOn(component.paginationChange, 'emit');
      const pageSize = 20;
      const currentPage = 4;

      componentRef.setInput('pageSize', pageSize);
      fixture.detectChanges();
      component.onChangePage(currentPage);

      expect(component.currentPage())
        .withContext('should set current page to value')
        .toBe(currentPage);
      expect(spy)
        .withContext('should emit pagiation change')
        .toHaveBeenCalledOnceWith({
          pageSize,
          currentPage: currentPage + 1,
        });
    });
  });

  describe('onPageSizeChange', () => {
    it('should set pageSize to value, current page to 0 and emit pagination change', () => {
      const spy = spyOn(component.paginationChange, 'emit');
      const pageSize = 20;
      componentRef.setInput('pageSize', null);
      fixture.detectChanges();
      component.onPageSizeChange(pageSize);

      expect(component.currentPage()).withContext('should set current page to 0').toBe(0);
      expect(component.currentPageSize()).toBe(pageSize);
      expect(spy).withContext('should emit pagiation change').toHaveBeenCalledOnceWith({
        pageSize,
        currentPage: 1,
      });
    });
  });

  describe('onSortChange', () => {
    it('should set current to 0 and emit sort change', () => {
      const spy = spyOn(component.sortChange, 'emit');
      const column: ColumnDef<ChessGridData> = {
        name: 'Rating',
        property: 'rating',
        sortable: true,
        sortDirection: Direction.NONE,
      };
      spyOn(TGridUtils, 'getNextSortDirection').and.returnValue(Direction.NONE);
      component.onSortChange(column);

      expect(component.currentPage()).withContext('should set current page to 0').toBe(0);
      expect(spy).withContext('should emit sort change').toHaveBeenCalledOnceWith({
        columnName: 'Rating',
        direction: Direction.NONE,
      });
    });

    it('should not emit sort change if column is not sortable', () => {
      const spy = spyOn(component.sortChange, 'emit');
      const column: ColumnDef<ChessGridData> = {
        name: 'Rating',
        property: 'rating',
        sortable: false,
        sortDirection: Direction.NONE,
      };
      component.onSortChange(column);

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit sort change if table is not sortable', () => {
      const spy = spyOn(component.sortChange, 'emit');
      const column: ColumnDef<ChessGridData> = {
        name: 'Rating',
        property: 'rating',
        sortable: true,
        sortDirection: Direction.NONE,
      };
      componentRef.setInput('sortable', false);
      fixture.detectChanges();
      component.onSortChange(column);

      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('viewRows', () => {
    beforeEach(() => {
      component.columnComponents = signal([
        {
          name: signal('Rating'),
          property: signal('rating'),
          sortable: signal(true),
          sortDirection: signal(Direction.NONE),
        } as any as TColumnComponent<ChessGridData>,
      ]);
    });

    it('should sort and paginate when onSortChange is called', () => {
      const expected = [data[0]];
      const sortSpy = spyOn(TGridUtils, 'getSortedRows').and.returnValue(expected);
      const paginateSpy = spyOn(TGridUtils, 'getPaginatedRows')
        .withArgs(expected, 10, 0)
        .and.returnValue(expected);
      const column: ColumnDef<ChessGridData> = {
        name: 'Rating',
        property: 'rating',
        sortable: true,
        sortDirection: Direction.NONE,
      };
      spyOn(TGridUtils, 'mapTColumnComponentsToColumnDef').and.returnValue([
        {
          name: 'Rating',
          property: 'rating' as never,
          sortable: true,
          sortDirection: Direction.NONE,
        },
      ]);
      component.onSortChange(column);
      fixture.detectChanges();

      expect(sortSpy).withContext('should sort').toHaveBeenCalledTimes(1);
      expect(paginateSpy).withContext('should paginate').toHaveBeenCalledTimes(1);
    });

    it('should paginate when onChangePage is called', () => {
      const expected = [data[0]];
      const paginateSpy = spyOn(TGridUtils, 'getPaginatedRows')
        .withArgs(expected, 10, 0)
        .and.returnValue(expected);
      componentRef.setInput('data', expected);
      component.onChangePage(2);
      fixture.detectChanges();

      expect(paginateSpy).toHaveBeenCalledTimes(1);
    });

    it('should paginate when onPageSizeChange is called', () => {
      componentRef.setInput('pageSize', null);
      fixture.detectChanges();
      const paginateSpy = spyOn(TGridUtils, 'getPaginatedRows')
        .withArgs(data, 25, 0)
        .and.returnValue(data);
      component.onPageSizeChange(25);
      fixture.detectChanges();

      expect(paginateSpy).toHaveBeenCalledTimes(1);
    });
  });
});
