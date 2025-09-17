import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChessGridComponent } from './chess-grid.component';
import { MockProvider, ngMocks } from 'ng-mocks';
import { ChessGridService } from '../../services/chess-grid.service';
import { chessGridServiceMock } from '../../services/mocks/chess-grid-service-mock.spec';
import { TGridComponent } from '../../../shared/components/t-grid/t-grid.component';
import { TColumnComponent } from '../../../shared/components/t-column/t-column.component';
import { of } from 'rxjs';
import { chessGridDataMock } from '../../mocks/chess-grid-data-mock.spec';
import { ChessService } from '../../../api/chess/services/chess.service';
import { chessServiceMock } from '../../../api/chess/services/mocks/chess-service-mock.spec';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy } from '@angular/core';

describe('ChessGridComponent', () => {
  let component: ChessGridComponent;
  let fixture: ComponentFixture<ChessGridComponent>;
  let chessGridService: jasmine.SpyObj<ChessGridService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChessGridComponent],
      providers: [MockProvider(HttpClient)],
    })
      .overrideComponent(TGridComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      })
      .overrideComponent(TColumnComponent, {
        set: { changeDetection: ChangeDetectionStrategy.OnPush },
      })
      .overrideProvider(ChessService, { useValue: chessServiceMock() })
      .overrideProvider(ChessGridService, { useValue: chessGridServiceMock() })
      .compileComponents();

    chessGridService = ngMocks.get(ChessGridService) as jasmine.SpyObj<ChessGridService>;
    chessGridService.getChessGridData.and.returnValue(of(chessGridDataMock()));

    fixture = TestBed.createComponent(ChessGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
