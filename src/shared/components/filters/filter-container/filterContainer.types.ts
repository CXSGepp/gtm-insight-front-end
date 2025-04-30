
export interface FilterContainerChildrenProps {
    localFilters: Record<string, any>;
    setLocalFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  }
  export interface FilterContainerProps {
    children:
      | React.ReactNode
      | ((props: FilterContainerChildrenProps) => React.ReactNode);
    loading?: boolean;
    : (filters: Record<string, any>) => void;
    onReset: () => void;
    applyLabel?: string;
    clearLabel?: string;
  }