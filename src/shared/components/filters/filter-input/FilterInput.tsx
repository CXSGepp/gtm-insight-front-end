import React from 'react';
import {
  TextField,
  Autocomplete,
  CircularProgress,
} from '@mui/material';

type FilterInputProps = {
  label: string;
  type?: 'text' | 'autocomplete';
  value: string | number | null; // Allow value to be string, number, or null (common for autocomplete)
  onChange: (value: any) => void;
  options?: (string | number)[]; // Options can still be string or number
  loading?: boolean;
  freeSolo?: boolean;
};

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
    const autocompleteValue = value === '' ? null : value; // Ensure value is null if it's an empty string for Autocomplete

    return (
      <Autocomplete
        fullWidth
        disablePortal
        freeSolo={freeSolo}
        options={options}
        getOptionLabel={(option) => String(option)} // Ensure options are treated as strings for display
        isOptionEqualToValue={(option, val) => String(option) === String(val)} // Handle cases where the option might be a number but the value state is a string or vice-versa
        value={autocompleteValue} // Use the adjusted value
        onChange={(event, newValue) => {
          onChange(newValue ?? ''); // When clearing the field (newValue is null) or using freeSolo with empty input, pass an empty string.
        }}
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

  const textValue = value === null || value === undefined ? '' : String(value); // For text input, ensure value is a string

  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      value={textValue} // Use the adjusted string value
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
