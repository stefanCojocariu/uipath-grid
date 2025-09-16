import { TColumnComponent } from '../components/t-column/t-column.component';
import { ColumnDef } from '../models/column-def.model';
import { Direction } from '../enums/direction.enum';

export class TGridUtils {
  public static getSortedRows<T>(rows: T[], sortedColumn: ColumnDef<T>): T[] {
    return [...rows].sort((a, b) => {
      const key = sortedColumn.property;
      let valueA = a[key];
      let valueB = b[key];

      if (sortedColumn.sortDirection == Direction.NONE) {
        return 0;
      }

      if (typeof valueA == 'number' && typeof valueB == 'number') {
        return sortedColumn.sortDirection == Direction.ASC ? valueA - valueB : valueB - valueA;
      }

      if (typeof valueA == 'string' && typeof valueB == 'string') {
        return sortedColumn.sortDirection == Direction.ASC
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });
  }

  public static getPaginatedRows<T>(rows: T[], pageSize: number | null, currentPage: number): T[] {
    const currentPageSize = pageSize ?? rows.length;
    const start = currentPage * currentPageSize;

    return rows.slice(start, start + currentPageSize);
  }

  public static mapTColumnComponentsToColumnDef<T>(
    columns: TColumnComponent<T> | TColumnComponent<T>[]
  ): ColumnDef<T>[] {
    const columnsArray = Array.isArray(columns) ? columns : [columns];

    return columnsArray.map((column) => ({
      name: column.name(),
      property: column.property(),
      sortable: column.sortable(),
      sortDirection: column.sortDirection(),
    }));
  }

  public static getNextSortDirection(direction: Direction) {
    if (direction === Direction.ASC) {
      return Direction.DESC;
    }
    if (direction === Direction.DESC) {
      return Direction.NONE;
    }

    return Direction.ASC;
  }
}
