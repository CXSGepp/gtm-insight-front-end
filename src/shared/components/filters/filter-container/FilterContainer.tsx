import React from 'react';
import { Box, Button} from '@mui/material';
import { FilterContainerProps } from './filterContainer.types';
import { GlassCard } from '../../glass-card/glass-card';

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

    <GlassCard sx={{ p: 2, mb: 2,
}}>

      {/* Filtros */}
      <Box
           sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1.5,
          width: '100%',
        }}

      >
        {enhancedChildren}
      </Box>
      {/* Botones */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          color="secondary"
          size='small'
          onClick={() => {
            setLocalFilters({});
            onReset();
          }}
          disabled={loading}
        >
          {clearLabel}
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size='small'
          onClick={() => onApply(localFilters)}
          disabled={loading}
        >
          {applyLabel}
        </Button>
      </Box>
    </GlassCard>
  );
}