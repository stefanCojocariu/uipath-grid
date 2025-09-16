import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TGrid } from './t-grid.component';

describe('TGrid', () => {
  let component: TGrid;
  let fixture: ComponentFixture<TGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(TGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
