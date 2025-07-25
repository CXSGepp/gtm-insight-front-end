import { Box, Paper } from "@mui/material";
import { DetailSection } from "./DetailSection";

interface MasterDetailLayoutProps {
  filters: React.ReactNode;
  masterTable: React.ReactNode;
  detailContent?: React.ReactNode;
  isDetailOpen?: boolean;
  detailTitle?: string;
}

const MasterDetailLayout: React.FC<MasterDetailLayoutProps> = ({
  filters,
  masterTable
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '90%',
        px: 2,
        boxSizing: 'border-box',
      }}
    >
      {filters}
      {masterTable}
    </Box>
  );
};

export default MasterDetailLayout;
