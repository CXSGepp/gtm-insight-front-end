import React from  'react';
import { TextField, MenuItem, Box } from '@mui/material';
import { useTableStore } from '../../../store/useTableStore';

export default function TableFilter() {
    const { filters, setFilters } =useTableStore();

    return (
        <Box display="flex" gap={2} alignItems="center" className="mb-4">
            <TextField 
                label="Región"
                variant="outlined"
                size="small"
                value={filters.cliente || "" }
                onChange={(e) => setFilters({ ...filters, cliente: e.target.value })}
                />
             <TextField
                select
                label="Bodega"
                variant="outlined"
                size="small"
                value={filters.bodega || ""}
                onChange={(e) => setFilters({ ...filters, bodega: e.target.value })}
            >
              <MenuItem value="">Todas</MenuItem>
              <MenuItem value="1">Bodega 1</MenuItem>
              <MenuItem value="2">Bodega 2</MenuItem>
            </TextField>
            <TextField
                select
                label="Ruta"
                variant="outlined"
                size="small"
                value={filters.ruta || ""}
                onChange={(e) => setFilters({ ...filters, ruta: e.target.value })}
            >
            <MenuItem value="">Todas</MenuItem>
            <MenuItem value="A">Ruta A</MenuItem>
            <MenuItem value="B">Ruta B</MenuItem>
            </TextField>
        </Box>
    )
}