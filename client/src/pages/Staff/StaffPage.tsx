import React from 'react';
import { Box } from '@mui/material';
import StaffList from '../../components/StaffList/StaffList';

const StaffPage: React.FC = () => {
  return (
    <Box sx={{ pt: 2 }}>
      <StaffList />
    </Box>
  );
};

export default StaffPage;