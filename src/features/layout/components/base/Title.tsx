import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useLayoutStore } from '../../store/useLayoutStore';

const Title: React.FC = () => {
  const { sidebarOpen } = useLayoutStore();

  return (
<Typography
  variant="h6"
  sx={{
    fontWeight: 'Bold',
    color: '#F2F2F2',
    flexGrow: 1,
    textAlign: 'right',
    
  }}
>
  GETM Insight
</Typography>


  );
};

export default Title;
