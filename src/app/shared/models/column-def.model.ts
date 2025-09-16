import { Direction } from '../enums/direction.enum';

export interface ColumnDef<T> {
  name: string;
  property: keyof T;
  sortable: boolean;
  sortDirection: Direction;
}
