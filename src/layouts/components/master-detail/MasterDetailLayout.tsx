import { Box, Collapse, Paper } from "@mui/material";

// src/layouts/components/master-detail/DetailSection.tsx
interface DetailSectionProps {
  children: React.ReactNode;
  isOpen: boolean;
  title?: string;
}

export const DetailSection: React.FC<DetailSectionProps> = ({
  children,
  isOpen,
  title
}) => {
  return (
    <Collapse in={isOpen} timeout="auto">
      <Paper
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: 'background.paper',
        }}
      >
        {title && (
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
        )}
        {children}
      </Paper>
    </Collapse>
  );
};

// src/layouts/components/master-detail/MasterDetailLayout.tsx
interface MasterDetailLayoutProps {
  filters: React.ReactNode;
  masterTable: React.ReactNode;
  detailContent?: React.ReactNode;
  isDetailOpen?: boolean;
  detailTitle?: string;
}

export const MasterDetailLayout: React.FC<MasterDetailLayoutProps> = ({
  filters,
  masterTable,
  detailContent,
  isDetailOpen = false,
  detailTitle
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper sx={{ p: 2 }}>{filters}</Paper>
      <Paper sx={{ p: 2 }}>{masterTable}</Paper>
      {detailContent && (
        <DetailSection isOpen={isDetailOpen} title={detailTitle}>
          {detailContent}
        </DetailSection>
      )}
    </Box>
  );
};