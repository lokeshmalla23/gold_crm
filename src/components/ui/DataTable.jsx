import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DataTable({ columns, data, rowKey = 'id', selectable = false, onRowClick, pageSize = 10, emptyText = 'No data found' }) {
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState([]);
  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paged = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggle = (id) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  };
  const toggleAll = () => {
    if (paged.every((r) => selected.includes(r[rowKey]))) {
      setSelected((s) => s.filter((id) => !paged.some((r) => r[rowKey] === id)));
    } else {
      setSelected((s) => [...new Set([...s, ...paged.map((r) => r[rowKey])])]);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {selectable && (
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    checked={paged.length > 0 && paged.every((r) => selected.includes(r[rowKey]))}
                    onChange={toggleAll}
                  />
                </th>
              )}
              {columns.map((c) => (
                <th key={c.key} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap">
                  {c.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="px-4 py-12 text-center text-gray-400">
                  {emptyText}
                </td>
              </tr>
            ) : (
              paged.map((row) => (
                <tr
                  key={row[rowKey]}
                  className={`border-b border-gray-100 last:border-b-0 hover:bg-amber-50/40 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={(e) => {
                    if (e.target.tagName === 'INPUT' || e.target.closest('button')) return;
                    onRowClick && onRowClick(row);
                  }}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        checked={selected.includes(row[rowKey])}
                        onChange={() => toggle(row[rowKey])}
                      />
                    </td>
                  )}
                  {columns.map((c) => (
                    <td key={c.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                      {c.render ? c.render(row) : row[c.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {data.length > pageSize && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 text-sm">
          <div className="text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, data.length)} of {data.length}
          </div>
          <div className="flex items-center gap-1">
            <button
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm ${currentPage === p ? 'bg-amber-500 text-white' : 'hover:bg-gray-100'}`}
              >
                {p}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setPage(currentPage + 1)}
              className="p-1.5 rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
