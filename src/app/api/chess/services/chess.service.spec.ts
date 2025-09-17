import { TestBed } from '@angular/core/testing';
import { ChessService } from './chess.service';
import { MockProvider } from 'ng-mocks';
import { HttpClient } from '@angular/common/http';

describe('ChessService', () => {
  let service: ChessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChessService, MockProvider(HttpClient)],
    });
    service = TestBed.inject(ChessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
