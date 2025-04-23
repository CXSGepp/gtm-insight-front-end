import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/graphqlClient';

import { RouterProvider } from '@tanstack/react-router';
import { router } from './routes/router';
import { ThemeProvider } from '@mui/material';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
      
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
