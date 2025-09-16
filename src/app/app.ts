import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { ChessGridComponent } from './chess/components/chess-grid/chess-grid.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChessGridComponent],
})
export class App {
  public progress = signal<number>(0);

  constructor() {
    const intervalId = setInterval(() => {
      if (this.progress() < 100) {
        this.progress.update((prev) => ++prev);
      } else {
        clearInterval(intervalId);
      }
    }, 100);
  }
}
