import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/router.tsx'
import { RouterProvider } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SnackbarProvider } from './shared/providers/SnackbarProvider';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <QueryClientProvider client={queryClient}>
       <SnackbarProvider>
    <RouterProvider router={router} />
</SnackbarProvider>
    <ReactQueryDevtools/>
    </QueryClientProvider>
  </StrictMode>,
)
 