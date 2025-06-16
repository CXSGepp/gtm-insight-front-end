import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from '@mui/material';
import TrafficSharpIcon from '@mui/icons-material/TrafficSharp';
import bulb from '../../../assets/bulb.png'; // Assuming you have a bulb image in the assets folder
interface SemaforoProps {
  status: string;
  activo_opm: boolean;
  activo_sio: boolean;
  canal: number;
}

export const SemaforoDialogCell: React.FC<SemaforoProps> = ({
  status,
  activo_opm,
  activo_sio,
  canal,
}) => {
  const [open, setOpen] = useState(false);

  const getColor = () => {
    switch (status?.toLowerCase()) {
      case 'verde':
        return 'success.main';
      case 'amarillo':
        return 'warning.main';
      case 'rojo':
      default:
        return 'error.main';
    }
  };

  const getFriendlyMessages = () => {
    const messages: string[] = [];

    if (!activo_opm) {
      messages.push('⚠️ OPM no está configurado correctamente. Revisa su integración.');
    }
    if (!activo_sio) {
      messages.push('⚠️ SIO tiene errores o no está activo. Verifica su configuración.');
    }
    if (canal !== 90) {
      messages.push('⚠️ Este producto no está asignado al canal 90. Ajusta la distribución si es necesario.');
    }

    return messages.length
      ? messages
      : ['✅ Todo en orden. El producto está correctamente configurado.'];
  };

  return (
    <>
      <Tooltip title="Ver resumen">
        <IconButton size="small" onClick={() => setOpen(true)}>
          <TrafficSharpIcon sx={{ color: getColor() }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 2,
          }}
        >
          <img
            src={bulb}
            alt="Idea"
            width={64}
            height={64}
            style={{ borderRadius: '12px' }}
          />
        </Box>
        <DialogTitle sx={{ textAlign: 'center', pt: 1 }}>
          Resumen de validaciones
        </DialogTitle>

        <DialogContent dividers>
          {getFriendlyMessages().map((msg, idx) => (
            <Typography
              key={idx}
              variant="body2"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              {msg}
            </Typography>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)} variant="contained" color="primary" fullWidth>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
