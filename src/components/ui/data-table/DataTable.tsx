'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;     // enable checkboxes
  multiple?: boolean;       // allow multi-select (default true)
  onRowSelect?: (rows: T[]) => void;
  emptyText?: string;
  className?: string;
}

type SortState<T> = { key: keyof T; direction: 'asc' | 'desc' } | null;

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  // Dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() - b.getTime();
  }

  // Numbers (or numeric strings)
  const na = Number(a);
  const nb = Number(b);
  const bothNumeric = !Number.isNaN(na) && !Number.isNaN(nb);
  if (bothNumeric) {
    if (na < nb) return -1;
    if (na > nb) return 1;
    return 0;
  }

  // Strings (locale-aware)
  return String(a).localeCompare(String(b), undefined, {
    sensitivity: 'base',
    numeric: true,
  });
}

function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  loading = false,
  selectable = false,
  multiple = true,
  onRowSelect,
  emptyText = 'No data',
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState<T>>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      const cmp = compareValues(av, bv);
      return sort.direction === 'asc' ? cmp : -cmp;
    });
    return copy;
  }, [data, sort]);

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.key !== col.dataIndex) {
        return { key: col.dataIndex, direction: 'asc' };
      }
      return { key: col.dataIndex, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
    });
  };

  const allChecked = selectable && selected.size === sorted.length && sorted.length > 0;

  const notify = (setOfIdx: Set<number>) => {
    const selectedRows = Array.from(setOfIdx).map((i) => sorted[i]);
    if (selectedRows.length && onRowSelect) {
      onRowSelect(selectedRows); // <-- no dangling expression; explicit call
    } else if (!selectedRows.length && onRowSelect) {
      onRowSelect([]); // make sure consumers know it’s empty when deselecting all
    }
  };

  const toggleRow = (rowIndex: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (multiple) {
        if (next.has(rowIndex)) next.delete(rowIndex);
        else next.add(rowIndex);
      } else {
        next.clear();
        next.add(rowIndex);
      }
      notify(next);
      return next;
    });
  };

  const toggleAll = () => {
    if (!selectable) return;
    setSelected((prev) => {
      const next = new Set<number>();
      if (prev.size !== sorted.length) {
        sorted.forEach((_, idx) => next.add(idx));
      }
      notify(next);
      return next;
    });
  };

  return (
    <div className={cn('w-full overflow-x-auto', className)} role="table" aria-busy={loading || undefined}>
      <table className="min-w-full border-separate border-spacing-0 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && (
              <th scope="col" className="px-3 py-2 text-left w-[1%]">
                <input
                  aria-label="Select all rows"
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((col) => {
              const isActive = sort && sort.key === col.dataIndex;
              const ariaSort: React.AriaAttributes['aria-sort'] = isActive
                ? sort!.direction === 'asc'
                  ? 'ascending'
                  : 'descending'
                : 'none';

              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={cn(
                    'px-4 py-2 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 select-none',
                    col.sortable && 'cursor-pointer'
                  )}
                  onClick={() => toggleSort(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span aria-hidden className="text-xs">
                        {isActive ? (sort!.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                Loading…
              </td>
            </tr>
          ) : sorted.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            sorted.map((row, idx) => (
              <tr
                key={idx}
                className="border-b last:border-b-0 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                role="row"
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label={`Select row ${idx + 1}`}
                      checked={selected.has(idx)}
                      onChange={() => toggleRow(idx)}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2 text-sm text-gray-800 dark:text-gray-100">
                    {String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
export { DataTable };
