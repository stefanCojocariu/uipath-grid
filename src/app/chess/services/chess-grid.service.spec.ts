import { TestBed } from '@angular/core/testing';
import { ChessGridService } from './chess-grid.service';
import { MockProvider } from 'ng-mocks';
import { ChessService } from '../../api/chess/services/chess.service';
import { chessServiceMock } from '../../api/chess/services/mocks/chess-service-mock.spec';

describe('ChessGridService', () => {
  let service: ChessGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChessGridService, MockProvider(ChessService, chessServiceMock(), 'useValue')],
    });
    service = TestBed.inject(ChessGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
