export interface VirtualizedAutocompleteProps<T> {
    label: string;
    value: T | null;
    options: T[];
    onChange: (value: T | null) => void;
    getOptionLabel: (option: T) => string;
    loading?: boolean;
    noOptionsText?: string;
  }
  