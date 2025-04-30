import { Chip } from '@mui/material';

interface GlobalStatusChipProps {
  status: string;
}

export function GlobalStatusChip({ status }: GlobalStatusChipProps) {
  let label = status;
  let color: 'success' | 'error' | 'warning' | 'default' = 'default';

  switch (status.toLowerCase()) {
    case 'verde':
      label = 'Activo';
      color = 'success';
      break;
    case 'rojo':
      label = 'Inactivo';
      color = 'error';
      break;
    case 'amarillo':
      label = 'Advertencia';
      color = 'warning';
      break;
    default:
      label = status;
  }

  return (
    <Chip
      label={label}
      color={color === 'default' ? undefined : color}
      variant="outlined"
      size="small"
    />
  );
}
