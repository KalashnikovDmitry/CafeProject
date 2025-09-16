import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../stores/StoreContext';

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = observer(({ children }) => {
  const { authStore } = useStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('token');
      if (token && !authStore.isAuthenticated) {
        // Если есть токен, но пользователь не аутентифицирован в store,
        // попробуем восстановить состояние
        try {
          // Здесь можно добавить запрос для проверки токена
          // Пока просто устанавливаем токен в store
          authStore.loginStaff.token = token;
        } catch (error) {
          // Токен недействителен
          sessionStorage.removeItem('token');
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [authStore]);

  if (isChecking) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Проверка доступа...
        </Typography>
      </Box>
    );
  }

  if (!authStore.isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  return <>{children}</>;
});

export default AdminGuard;
