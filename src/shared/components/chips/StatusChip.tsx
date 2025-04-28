import { Chip } from '@mui/material';

export function StatusChip({ active }: { active: boolean }) {
  return (
    <Chip
      label={active ? 'Activo' : 'Inactivo'}
      color={active ? 'success' : 'error'}
      variant="outlined"
      size="small"
    />
  );
}
