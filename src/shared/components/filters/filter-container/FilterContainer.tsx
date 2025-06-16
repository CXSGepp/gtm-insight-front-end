import React from 'react';
import { Box, Button, Paper } from '@mui/material';
import { FilterContainerProps } from './filterContainer.types';

export default function FilterContainer({
  children,
  loading = false,
  onApply,
  onReset,
  applyLabel = 'Aplicar Filtros',
  clearLabel = 'Limpiar Filtros',
}: FilterContainerProps) {
  const [localFilters, setLocalFilters] = React.useState<Record<string, any>>({});

  const enhancedChildren =
    typeof children === 'function'
      ? children({ localFilters, setLocalFilters })
      : children;

  return (
    <Paper sx={{ p: 2, mb: 2, display: 'flex', flexDirection: 'column', gap: 2, backgroundColor: 'transparent' }} elevation={0}>
      {/* Filtros */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          justifyContent: 'flex-start',
        }}
      >
        {enhancedChildren}
      </Box>
      {/* Botones */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 1,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setLocalFilters({});
            onReset();
          }}
          disabled={loading}
        >
          {clearLabel}
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onApply(localFilters)}
          disabled={loading}
        >
          {applyLabel}
        </Button>
      </Box>
    </Paper>
  );
}
