export interface FilterContainerProps {
    children: React.ReactNode;
    loading?: boolean;
    onApply: () => void;
    onReset: () =>  void;
    applyLabel?:  string;
    clearLabel?: string;
}