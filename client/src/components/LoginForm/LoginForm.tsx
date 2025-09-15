import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { observer } from 'mobx-react-lite';
import { useAuthStore } from '../../stores/StoreContext';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = observer(() => {
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await authStore.login(data);
      navigate('/admin/staffs'); 
    } catch (error) {
      // Error is already handled in the store
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Вход
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="email"
            control={control}
            rules={{ required: 'Введите email' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Email"
                type="email"
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                placeholder="Введите ваш email"
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Введите пароль' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Пароль"
                type="password"
                margin="normal"
                error={!!errors.password}
                helperText={errors.password?.message}
                placeholder="Введите ваш пароль"
              />
            )}
          />

          {authStore.loginError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {authStore.loginError}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={authStore.isLoginLoading}
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            {authStore.isLoginLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Войти'
            )}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            disabled={authStore.isLoginLoading}
            onClick={() => navigate('/auth/registration')}
            sx={{ py: 1.5 }}
          >
            Регистрация пользователя
          </Button>
        </Box>
      </Paper>
    </Box>
  );
});

export default LoginForm;