import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  DialogProps,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import color from 'color';

const glassDialogStyles = {
  background: color('#1821D9').alpha(0.1).toString(),
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.15)',
  backgroundImage: 'none',
  boxShadow: '2px 7px 0px 0 rgba(14, 14, 14, 0.75)',
  color: '#F2F2F2',
  
};

interface GlassDialogProps extends Omit<DialogProps, 'open' | 'title'> {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  children: React.ReactNode;
}

export const GlassDialog: React.FC<GlassDialogProps> = ({
  open,
  onClose,
  title,
  children,
  ...rest // para pasar otras props como maxWidth, fullWidth
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: glassDialogStyles }}
      {...rest}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {title}
        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};export const ReusableGlassDialog: React.FC<GlassDialogProps> = ({
  open,
  onClose,
  title,
  children,
  ...rest // para pasar otras props como maxWidth, fullWidth
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{ sx: glassDialogStyles }}
      {...rest}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {title}
        <IconButton aria-label="close" onClick={onClose} sx={{ color: 'white' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};