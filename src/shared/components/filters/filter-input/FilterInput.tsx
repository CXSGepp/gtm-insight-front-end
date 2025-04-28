import React, { useMemo } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { FilterInputProps } from './filterInput.types';

export default function FilterInput<T>({
  label,
  type,
  value,
  options = [],
  onChange,
  getOptionLabel,
  loading = false,
  noOptionsText = "No options",
  disabled = false,
}: FilterInputProps<T>) {

  const flatOptions = useMemo(
    () => options.map(opt => ({
      label: getOptionLabel ? getOptionLabel(opt) : String(opt),
      value: opt,
    })),
    [options, getOptionLabel]
  );

  if (type === 'autocomplete') {
    return (
      <Autocomplete
        disabled={disabled}
        loading={loading}
        options={flatOptions}
        value={value ? { label: getOptionLabel ? getOptionLabel(value) : String(value), value } : null}
        onChange={(_, newValue) => onChange(newValue?.value ?? null)}
        getOptionLabel={(option) => option.label}
        noOptionsText={noOptionsText}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            fullWidth
            sx={{ minWidth: 200 }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps?.endAdornment}
                </>
              ),
            }}
          />
        )}
        sx={{ minWidth: 200 }}
      />
    );
  }

  return (
    <TextField
      label={label}
      fullWidth
      value={value ?? ''}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value as unknown as T)}
      disabled={disabled}
      sx={{ minWidth: 200 }}
    />
  );
}
