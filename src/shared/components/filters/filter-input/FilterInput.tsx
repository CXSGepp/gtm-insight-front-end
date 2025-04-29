import React from 'react';
import {
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';

type FilterInputProps = {
  label: string;
  type?: 'text' | 'autocomplete';
  value: string | number;
  onChange: (value: any) => void;
  options?: (string | number)[];
  loading?: boolean;
  freeSolo?: boolean; // ✅ Agregado
};

export default function FilterInput({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  loading = false,
  freeSolo = false, // ✅ Valor por defecto
}: FilterInputProps) {
  if (type === 'autocomplete') {
    return (
      <Autocomplete
        fullWidth
        disablePortal
        freeSolo={freeSolo} // ✅ Ahora está definido
        options={options}
        value={value ?? ''}
        onChange={(event, newValue) => onChange(newValue ?? '')}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    );
  }

  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
