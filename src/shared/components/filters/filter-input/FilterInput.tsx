import React from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';

interface Option {
  label: string;
  value: string | number;
}

interface FilterInputProps {
  label: string;
  type?: 'autocomplete' | 'text';
  options?: Option[];
  value: string | number;
  loading?: boolean;
  freeSolo?: boolean;
  onChange: (value: any) => void;
}

export default function FilterInput({
  label,
  type = 'text',
  value,
  onChange,
  options = [],
  loading = false,
  freeSolo = false,
}: FilterInputProps) {
  if (type === 'autocomplete') {
    return (
      <Autocomplete
        sx={{ minWidth: 200 }}
        freeSolo={freeSolo}
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          return option.label;
        }}
        isOptionEqualToValue={(option, val) =>
          typeof val === 'object'
            ? option.value === val.value
            : option.value === val
        }
        value={
          typeof value === 'string' || typeof value === 'number'
            ? options.find((o) => o.value === value) || (freeSolo ? value : null)
            : value
        }
        onChange={(_, newValue) => {
          if (typeof newValue === 'string') return onChange(newValue);
          if (newValue && typeof newValue === 'object') return onChange(newValue.value);
          return onChange('');
        }}
        onInputChange={(e, newInputValue, reason) => {
          if (freeSolo && reason === 'input') onChange(newInputValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={20} />}
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
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
