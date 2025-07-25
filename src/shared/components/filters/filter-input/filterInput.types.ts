export type FilterInputType = 'text' | 'autocomplete';

export interface FilterInputProps<T = any> {
  label: string;
  type: FilterInputType;
  value: T | null;
  options?: T[];
  onChange: (value: T | null) => void;
  getOptionLabel?: (option: T) => string;
  loading?: boolean;
  noOptionsText?: string;
  disabled?: boolean;
}