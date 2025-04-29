import { Skeleton, Box } from '@mui/material';

export default function WarehouseFiltersSkeleton() {
  return (
    <Box display="flex" flexDirection="column" gap={2} padding={2}>
      {/* Skeleton para cada filtro */}
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      <Skeleton variant="rectangular" height={56} />
      {/* Puedes agregar más dependiendo de cuántos filtros tengas */}
    </Box>
  );
}
