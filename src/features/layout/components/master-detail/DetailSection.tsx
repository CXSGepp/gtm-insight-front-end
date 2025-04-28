import { Box, Collapse, Paper, Typography } from "@mui/material";

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

