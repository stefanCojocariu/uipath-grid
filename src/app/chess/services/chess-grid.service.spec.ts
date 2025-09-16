import { TestBed } from '@angular/core/testing';

import { ChessGrid } from './chess-grid.service';

describe('ChessGrid', () => {
  let service: ChessGrid;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChessGrid);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
