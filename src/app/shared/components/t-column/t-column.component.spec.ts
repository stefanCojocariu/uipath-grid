import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TColumnComponent } from './t-column.component';
import { ChessGridData } from '../../../chess/models/chess-grid-data.model';

describe('TColumnComponent', () => {
  let component: TColumnComponent<ChessGridData>;
  let fixture: ComponentFixture<TColumnComponent<ChessGridData>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TColumnComponent<ChessGridData>],
    }).compileComponents();

    fixture = TestBed.createComponent(TColumnComponent<ChessGridData>);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
