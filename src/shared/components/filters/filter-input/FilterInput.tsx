import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

interface FilterInputProps {
  label: string;
  type: 'autocomplete' | 'text' | 'date';
  options?: { label: string; value: any }[];
  value: any;
  onChange: (value: any) => void;
}

export default function FilterInput({
  label,
  type,
  options = [],
  value,
  onChange,
}: FilterInputProps) {
  if (type === 'autocomplete') {
    return (
      <Autocomplete
        options={options}
        getOptionLabel={(option) => {
          if (typeof option === 'string') return option;
          return option.label || '';
        }}
        isOptionEqualToValue={(option, value) => option.value === value}
        value={options.find((o) => o.value === value) || null}
        onChange={(_, newValue) => onChange(newValue ? newValue.value : '')}
        renderInput={(params) => (
          <TextField {...params} label={label} fullWidth />
        )}
      />
    );
  }

  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  );
}
