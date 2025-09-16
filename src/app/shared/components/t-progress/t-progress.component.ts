import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Hourglass } from '../../icons/hourglass/hourglass.component';

@Component({
  selector: 't-progress',
  imports: [Hourglass],
  templateUrl: './t-progress.component.html',
  styleUrl: './t-progress.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TProgressComponent {
  public radius = input.required<number>();
  public progress = input.required<number>();
  public color = input.required<string>();

  public circleLength = computed(() => 2 * Math.PI * this.radius());
  public progressOffset = computed(() => this.circleLength() * (1 - this.progress() / 100));
  public circleCenter = computed(() => this.radius() + this.strokeWidth / 2);
  public progressText = computed(() => Math.round(this.progress()));

  public strokeWidth = 12;
}
