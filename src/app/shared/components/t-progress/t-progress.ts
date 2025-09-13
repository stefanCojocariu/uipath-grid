import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Hourglass } from '../../icons/hourglass/hourglass';

@Component({
  selector: 't-progress',
  templateUrl: './t-progress.html',
  styleUrl: './t-progress.scss',
  imports: [Hourglass],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TProgress {
  public radius = input.required<number>();
  public progress = input.required<number>();
  public color = input.required<string>();

  public circumference = computed(() => 2 * Math.PI * this.radius());
  public progressOffset = computed(() => this.circumference() * (1 - this.progress() / 100));
  public circleCenter = computed(() => this.radius() + this.strokeWidth / 2);

  public strokeWidth = 12;
}
