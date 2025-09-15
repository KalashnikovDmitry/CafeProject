import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStaffStore } from '../../stores/StoreContext';
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Chip,
  Alert,
  CircularProgress,
} from '@mui/material';
import { Person as PersonIcon } from '@mui/icons-material';

const StaffList: React.FC = observer(() => {
  const staffStore = useStaffStore();

  useEffect(() => {
    staffStore.fetchStaffs();
  }, [staffStore]);

  if (staffStore.isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (staffStore.error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        {staffStore.error}
      </Alert>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Сотрудники
        </Typography>

        {staffStore.staffs.length === 0 ? (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ py: 4 }}>
            Сотрудники не найдены
          </Typography>
        ) : (
          <List>
            {staffStore.staffs.map((staff) => (
              <ListItem
                key={staff.id}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'grey.300',
                  '&:hover': {
                    boxShadow: 2,
                    transform: 'translateY(-2px)',
                    transition: 'all 0.2s ease-in-out',
                  },
                }}
              >
                <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                  <PersonIcon />
                </Avatar>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography variant="h6">{staff.name}</Typography>
                      <Chip
                        label={staff.role}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {staff.email}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {staff.phone}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
});

export default StaffList;