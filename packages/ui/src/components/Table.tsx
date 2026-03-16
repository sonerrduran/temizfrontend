import React from 'react';

export interface Column<T> {
  key: string;
  title: string;
  render?: (value: any, row: T) => React.ReactNode;
  width?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyText?: string;
}

export function Table<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  loading = false,
  emptyText = 'Veri bulunamadı',
}: TableProps<T>) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500/20 border-t-purple-500"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-white/50">
        {emptyText}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/10">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-6 py-4 text-left text-sm font-semibold text-white/70 uppercase tracking-wider"
                style={{ width: column.width }}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={keyExtractor(row)}
              onClick={() => onRowClick?.(row)}
              className={`border-b border-white/5 transition-colors ${
                onRowClick ? 'hover:bg-white/5 cursor-pointer' : ''
              }`}
            >
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-white">
                  {column.render
                    ? column.render((row as any)[column.key], row)
                    : (row as any)[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
