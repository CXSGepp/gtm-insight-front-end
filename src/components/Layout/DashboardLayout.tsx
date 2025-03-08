import React from 'react';
import {
    AppBar,
    Toolbar, 
    Typography,
    Container,
    Box,
    ThemeProvider,
    createTheme,
    CssBaseline,
} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children })  => { 
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Box sx={{ flexGrow: 1 }}> 
                <AppBar  position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
                            Reporte Gepp en tus Manos 
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container maxWidth="xl" sx={{ mt: 4, mb:4 }}>
                    {children}
                </Container>
            </Box>
        </ThemeProvider>
    )
}