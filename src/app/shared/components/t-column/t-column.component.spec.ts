import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TColumn } from './t-column.component';

describe('TColumn', () => {
  let component: TColumn;
  let fixture: ComponentFixture<TColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TColumn],
    }).compileComponents();

    fixture = TestBed.createComponent(TColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
