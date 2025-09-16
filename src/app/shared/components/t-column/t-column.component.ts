import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Direction } from '../../enums/direction.enum';

@Component({
  selector: 't-column',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TColumnComponent<T> {
  public name = input.required<string>();
  public property = input.required<keyof T>();
  public sortable = input.required<boolean>();
  public sortDirection = input<Direction>(Direction.NONE);
}
