import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  Snackbar,
  Alert as MuiAlert,
  AlertProps,
  AlertColor,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

// 1. Reenvía la referencia para permitir el control correcto del Alert por el Snackbar
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertColor) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('info');

  const showSnackbar = (newMessage: string, newSeverity: AlertColor = 'info') => {
    setMessage(newMessage);
    setSeverity(newSeverity);
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      console.log('[Snackbar] handleClose fired', { reason, openBefore: open });

    if (reason === 'clickaway') return;
    setOpen(false);
  };

   return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
      open={open}
      autoHideDuration={6000}
  onClose={handleClose}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
  action={
    <IconButton
      aria-label="close"
      color="inherit"
      size="small"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  }
>
  <Alert
    onClose={handleClose}
    severity={severity}
    sx={{ width: '100%' }}
  >
    {message}
  </Alert>
</Snackbar>
    </SnackbarContext.Provider>
  );
};