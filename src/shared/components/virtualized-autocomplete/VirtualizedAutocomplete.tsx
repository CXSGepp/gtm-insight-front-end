import React, { useMemo, forwardRef } from 'react';
import {
  Autocomplete,
  TextField,
  CircularProgress,
  autocompleteClasses,
  AutocompleteRenderInputParams,
} from '@mui/material';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { VirtualizedAutocompleteProps } from './virtualizedAutocomplete.types';

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props;
  const option = data?.[index];
  if (!option) return null; 

  return (
    <div style={{ ...style }}>
      {React.isValidElement(option) ? option : <div>{String(option)}</div>}
    </div>
  );
}

const VirtualizedListboxComponent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(
  function VirtualizedListboxComponent(props, ref) {
    const { children, ...other } = props;
    const itemCount = Array.isArray(children) ? children.length : 0;
    const itemSize = 48;

    return (
      <div ref={ref} {...other}>
        <FixedSizeList
          height={Math.min(8, itemCount) * itemSize}
          width="100%"
          itemSize={itemSize}
          itemCount={itemCount}
          overscanCount={5}
          itemData={children}
        >
          {renderRow}
        </FixedSizeList>
      </div>
    );
  }
);

export default function VirtualizedAutocomplete<T>({
  label,
  value,
  options,
  onChange,
  getOptionLabel,
  loading = false,
  noOptionsText = "No options",
}: VirtualizedAutocompleteProps<T>) {
  const flatOptions = useMemo(
    () =>
      options.map((opt) => ({
        label: getOptionLabel(opt),
        value: opt,
      })),
    [options, getOptionLabel]
  );

  return (
    <Autocomplete
      options={flatOptions}
      value={value ? { label: getOptionLabel(value), value } : null}
      onChange={(_, newValue) => onChange(newValue?.value ?? null)}
      getOptionLabel={(option) => option.label}
      loading={loading}
      noOptionsText={noOptionsText}
      disableListWrap
      slots={{
        listbox: VirtualizedListboxComponent,
      }}
      renderInput={(params: AutocompleteRenderInputParams) => (
        <TextField
          {...params}
          label={label}
          fullWidth
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
      sx={{
        [`& .${autocompleteClasses.listbox}`]: {
          boxSizing: 'border-box',
        },
      }}
    />
  );
}
