import React from'react';
import { useTableStore } from '../../../store/useTableStore';

export default function Pagination({ hasMore }: { hasMore: boolean }) {
    const { cursor, setCursor, limit, setLimit } = useTableStore();
    return (
        <div className="flex items-center justify-between mt-4">
            <button 
                className={`px-4 py-2 bg-blue-500 text-white rouded ${
                    !cursor ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!cursor}
                onClick={() => setCursor(null)}
                >
                    Volver al Inicio
                </button>
                <div className ="flex items-center gap-4">
                    <span> Filas por página: </span>
                    <select 
                    className="border p-1 rounded"
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    >
                        <option value={50}></option>
                        <option value={100}></option>
                        <option value={200}></option>
                    </select>
                </div>
                <button
                    className={`px-4 py-2 bg-green-500 text-white rounded ${
                        !hasMore ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={!hasMore}
                    onClick={() => setCursor(cursor)}
                    >
                        Cargar más
                    </button>
        </div>
    );
}