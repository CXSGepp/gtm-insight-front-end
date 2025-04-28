import { AppBar, Toolbar, Typography } from '@mui/material';

const AppBarComponent = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          Gepp en tus Manos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
