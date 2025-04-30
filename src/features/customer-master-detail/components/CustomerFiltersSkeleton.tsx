import { Skeleton, Grid } from '@mui/material';

export default function CustomersFiltersSkeleton() {
  return (
    <Grid container spacing={2} padding={2}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Skeleton
            variant="rectangular"
            height={56}
            animation="wave"
            sx={{ borderRadius: 1 }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
