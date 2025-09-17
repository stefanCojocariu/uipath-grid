import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { MockComponent } from 'ng-mocks';
import { ChessGridComponent } from './chess/components/chess-grid/chess-grid.component';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, MockComponent(ChessGridComponent)],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
