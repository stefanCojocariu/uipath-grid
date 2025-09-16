import { Direction } from '../enums/direction.enum';

export interface SortChange {
  columnName: string;
  direction: Direction;
}
