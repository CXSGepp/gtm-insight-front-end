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
  masterTable,
  detailContent,
  isDetailOpen = false,
  detailTitle
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        px: 2,
        boxSizing: 'border-box',
      }}
    >
      <Paper sx={{ p: 2, overflowX: 'auto' }}>{filters}</Paper>
      <Paper sx={{ p: 2, overflowX: 'auto' }}>{masterTable}</Paper>
      {detailContent && (
        <DetailSection isOpen={isDetailOpen} title={detailTitle}>
          {detailContent}
        </DetailSection>
      )}
    </Box>
  );
};

export default MasterDetailLayout;
