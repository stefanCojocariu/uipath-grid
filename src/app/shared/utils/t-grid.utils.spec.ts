import { TestBed } from '@angular/core/testing';

describe('TGridUtils', () => {
  let service: TGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
