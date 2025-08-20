import React, { useState } from "react";

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
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: number | string }>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState(true);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(col.key);
      setSortAsc(true);
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey as keyof T];
    const valB = b[sortKey as keyof T];
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  const toggleRow = (row: T) => {
    let newSelection: T[];
    if (selectedRows.includes(row)) {
      newSelection = selectedRows.filter((r) => r !== row);
    } else {
      newSelection = [...selectedRows, row];
    }
    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  if (loading)
    return (
      <div className="text-gray-700 dark:text-gray-200 transition-colors duration-200">
        Loading...
      </div>
    );
  if (data.length === 0)
    return (
      <div className="text-gray-700 dark:text-gray-200 transition-colors duration-200">
        No data available
      </div>
    );

  return (
    <table className="min-w-full border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <thead className="bg-gray-50 dark:bg-gray-800 transition-colors duration-200">
        <tr>
          {selectable && <th className="p-2 border-b dark:border-gray-700"></th>}
          {columns.map((col) => (
            <th
              key={col.key}
              onClick={() => handleSort(col)}
              className={`p-2 border-b dark:border-gray-700 cursor-pointer transition-colors duration-200 ${
                col.sortable ? "hover:bg-gray-100 dark:hover:bg-gray-700" : ""
              } text-gray-600 dark:text-gray-300 text-left text-sm font-medium`}
            >
              {col.title}
              {sortKey === col.key && (sortAsc ? " ▲" : " ▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 transition-colors duration-200">
        {sortedData.map((row) => (
          <tr
            key={row.id}
            className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {selectable && (
              <td className="p-2 border-b dark:border-gray-700">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td
                key={col.key}
                className="p-2 border-b dark:border-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
              >
                {String(row[col.dataIndex])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
