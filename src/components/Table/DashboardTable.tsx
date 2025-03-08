import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import { useDashboardData } from "../../hooks/useDashboardData";
import { useDashboardStore } from "../../store/DashboardStore";

interface DashboardRow {
  ID: number;
  REGION: string;
  ZONA: string;
  LOCALIDAD: string;
  BODEGA: number;
  RUTA: string;
  CLIENTE: number;
  NOMBRE: string;
  TIPO_RUTA: string;
  CLASIFICACION: string;
  FRECUENCIA: string;
  CLAVE_LISTA: number;
  ACTIVA: string;
  TELEFONO: string;
  DIRECCION: string;
  LAST_UPDATED: string;
}

export const DashboardTable = () => {
  // Fetch data from Apollo cache
  const { data, loading, total } = useDashboardData();
  const { pageSize, setPageSize, filters } = useDashboardStore();
  const [page, setPage] = useState(0);

  // Reset pagination when filters change
  useEffect(() => {
    setPage(0);
  }, [filters]);

  // Filter data in-memory
  const filteredData = useMemo(() => {
    if (!filters || Object.keys(filters).length === 0) return data;

    return data.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return row[key as keyof DashboardRow]
          ?.toString()
          ?.toLowerCase()
          ?.includes(value.toString().toLowerCase());
      })
    );
  }, [data, filters]);

  // Paginate data in-memory
  const paginatedData = useMemo(() => {
    const startIndex = page * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, page, pageSize]);

  // Table columns
  const columns = useMemo<ColumnDef<DashboardRow, any>[]>(
    () => [
      { accessorKey: "ID", header: "ID" },
      { accessorKey: "REGION", header: "Región" },
      { accessorKey: "ZONA", header: "Zona" },
      { accessorKey: "LOCALIDAD", header: "Localidad" },
      { accessorKey: "BODEGA", header: "Bodega" },
      { accessorKey: "RUTA", header: "Ruta" },
      { accessorKey: "CLIENTE", header: "Cliente" },
      { accessorKey: "NOMBRE", header: "Nombre" },
      { accessorKey: "TIPO_RUTA", header: "Tipo Ruta" },
      { accessorKey: "CLASIFICACION", header: "Clasificación" },
      { accessorKey: "FRECUENCIA", header: "Frecuencia" },
      { accessorKey: "CLAVE_LISTA", header: "Clave Lista" },
      { accessorKey: "ACTIVA", header: "Activa" },
      { accessorKey: "TELEFONO", header: "Teléfono" },
      { accessorKey: "DIRECCION", header: "Dirección" },
      {
        accessorKey: "LAST_UPDATED",
        header: "Última Actualización",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
      },
    ],
    []
  );

  // Create table instance
  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading && data.length === 0) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* Header: Title and Controls */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Dashboard Data</h2>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 text-sm">Total: {total}</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(0);
            }}
            className="border rounded px-2 py-1 text-sm"
          >
            {[50, 100, 200, 500].map((size) => (
              <option key={size} value={size}>
                {size} rows
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-2 whitespace-nowrap text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(Math.max(page - 1, 0))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">Page {page + 1}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * pageSize + pageSize >= filteredData.length}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
