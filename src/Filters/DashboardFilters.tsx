import React from 'react';
import { 
    Paper,
    Grid,
    TextField,
    Button,
    Box,
    Typography,
    Autocomplete,
    CircularProgress
} from '@mui/material';
import { useDashboardStore } from '../store/DashboardStore';
import { useDashboardData } from '../hooks/useDashboardData';

export const DashboardFilters = () => {
    const { filters, setFilters, clearFilters } = useDashboardStore();
    const { data, loading } = useDashboardData();
    const [localFilters, setLocalFilters] = React.useState(filters);

    // Get unique values for dropdowns
    const filterOptions = React.useMemo(() => {
        const options = {
            REGION: new Set<string>(),
            ZONA: new Set<string>(),
            BODEGA: new Set<number>(),
            TIPO_RUTA: new Set<string>(),
            CLASIFICACION: new Set<string>()
        };

        data.forEach(item => {
            if (item.REGION) options.REGION.add(item.REGION);
            if (item.ZONA) options.ZONA.add(item.ZONA);
            if (item.BODEGA) options.BODEGA.add(item.BODEGA);
            if (item.TIPO_RUTA) options.TIPO_RUTA.add(item.TIPO_RUTA);
            if (item.CLASIFICACION) options.CLASIFICACION.add(item.CLASIFICACION);
        });

        return {
            REGION: Array.from(options.REGION).sort(),
            ZONA: Array.from(options.ZONA).sort(),
            BODEGA: Array.from(options.BODEGA).sort((a, b) => a - b),
            TIPO_RUTA: Array.from(options.TIPO_RUTA).sort(),
            CLASIFICACION: Array.from(options.CLASIFICACION).sort()
        };
    }, [data]);

    // Sync local filters with store filters
    React.useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Remove empty values before setting filters
        const cleanedFilters = Object.entries(localFilters).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== '' && value !== null) {
                acc[key] = value;
            }
            return acc;
        }, {} as Record<string, string | number>);
        setFilters(cleanedFilters);
    };

    const handleClear = () => {
        setLocalFilters({});
        clearFilters();
    };

    const handleChange = (field: string, value: string | number | null) => {
        setLocalFilters(prev => ({
            ...prev,
            [field]: value ?? undefined
        }));
    };

    if (loading && !data.length) {
        return (
            <Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mb: 2 }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Filtros</Typography>
                    </Grid>
                    
                    {/* Cliente Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Cliente"
                            type="number"
                            value={localFilters.CLIENTE || ''}
                            onChange={(e) => handleChange('CLIENTE', e.target.value ? Number(e.target.value) : null)}
                            inputProps={{ min: 0 }}
                        />
                    </Grid>

                    {/* Teléfono Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            fullWidth
                            label="Teléfono"
                            value={localFilters.TELEFONO || ''}
                            onChange={(e) => handleChange('TELEFONO', e.target.value)}
                        />
                    </Grid>

                    {/* Región Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={filterOptions.REGION}
                            value={localFilters.REGION || null}
                            onChange={(_, newValue) => handleChange('REGION', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Región" fullWidth />
                            )}
                            loading={loading}
                            loadingText="Cargando..."
                            noOptionsText="Sin opciones"
                        />
                    </Grid>

                    {/* Zona Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={filterOptions.ZONA}
                            value={localFilters.ZONA || null}
                            onChange={(_, newValue) => handleChange('ZONA', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Zona" fullWidth />
                            )}
                            loading={loading}
                            loadingText="Cargando..."
                            noOptionsText="Sin opciones"
                        />
                    </Grid>

                    {/* Bodega Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={filterOptions.BODEGA}
                            value={localFilters.BODEGA || null}
                            onChange={(_, newValue) => handleChange('BODEGA', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Bodega" fullWidth />
                            )}
                            loading={loading}
                            loadingText="Cargando..."
                            noOptionsText="Sin opciones"
                        />
                    </Grid>

                    {/* Tipo Ruta Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={filterOptions.TIPO_RUTA}
                            value={localFilters.TIPO_RUTA || null}
                            onChange={(_, newValue) => handleChange('TIPO_RUTA', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Tipo Ruta" fullWidth />
                            )}
                            loading={loading}
                            loadingText="Cargando..."
                            noOptionsText="Sin opciones"
                        />
                    </Grid>

                    {/* Clasificación Filter */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Autocomplete
                            options={filterOptions.CLASIFICACION}
                            value={localFilters.CLASIFICACION || null}
                            onChange={(_, newValue) => handleChange('CLASIFICACION', newValue)}
                            renderInput={(params) => (
                                <TextField {...params} label="Clasificación" fullWidth />
                            )}
                            loading={loading}
                            loadingText="Cargando..."
                            noOptionsText="Sin opciones"
                        />
                    </Grid>

                    {/* Action Buttons */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button 
                                type="submit" 
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                Aplicar Filtros
                            </Button>
                            <Button 
                                onClick={handleClear} 
                                variant="outlined"
                                color="secondary"
                                disabled={loading}
                            >
                                Limpiar Filtros
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}; 