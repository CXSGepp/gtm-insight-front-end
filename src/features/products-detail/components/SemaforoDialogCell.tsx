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

interface SemaforoProps {
  status: string;
  activo_opm: boolean;
  activo_sio: boolean;
  canal: boolean; // canal 90
  listaPrecio: boolean;
  activo_hh: boolean;
}

export const SemaforoDialogCell: React.FC<SemaforoProps> = ({
  status,
  activo_opm,
  activo_sio,
  canal,
  listaPrecio,
  activo_hh,
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

    // Orden de validación: OPM → SIO → Canal → Lista Precios → HH

    if (!activo_opm) {
      messages.push('⚠️ OPM no está activo para este producto. Asegúrate de que esté registrado correctamente en el sistema OPM para esta bodega.');
    }
    else{
      messages.push('✅ OPM está activo para este producto.');
    }

    if (!activo_sio) {
      messages.push('⚠️ OPM no está activo para este producto. Asegúrate de que esté registrado correctamente en el sistema OPM para esta bodega.');
    }
    else {
      messages.push('✅ SIO está activo para este producto.');
    }

      if (!canal) {
    messages.push('⚠️ El producto no está asignado al canal 90 (Ecommerce/Distribución digital). Verifica si debe incluirse en este canal según el cliente.');
  } else {
    messages.push('✅ El producto está asignado al canal 90.');
  }
   if (!listaPrecio) {
    messages.push('⚠️ No se encontró un precio vigente en la lista del cliente. Asegúrate de que el producto esté incluido en la lista con fecha de preventa válida.');
  } else {
    messages.push('✅ El producto tiene una configuración válida en la lista de precios.');
  }

    if (!activo_hh) {
      messages.push('⚠️ El canal HH (Handheld/Preventista) no está habilitado.');
    } else {
      messages.push('✅ El canal HH está habilitado para este producto.');
    }

    return messages.length
      ? messages
      : ['✅ Todo en orden. El producto está correctamente configurado en todos los sistemas.'];
  };

  return (
    <>
      <Tooltip title="Ver acciones de validación" arrow>
        <IconButton size="small" onClick={() => setOpen(true)}>
          <TrafficSharpIcon sx={{ color: getColor() }} />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', pt: 2 }}>
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
