import { Component, signal } from '@angular/core';
import { TProgress } from './shared/components/t-progress/t-progress';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  standalone: true,
  imports: [TProgress],
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
