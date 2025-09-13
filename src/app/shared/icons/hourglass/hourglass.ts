import { Component, input } from '@angular/core';

@Component({
  selector: 'hourglass',
  templateUrl: './hourglass.html',
  standalone: true,
})
export class Hourglass {
  public size = input.required<number>();
}
