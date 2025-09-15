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

interface RegistrationFormInputs {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: string;
}

const RegistrationForm: React.FC = observer(() => {
  const { control, handleSubmit, formState: { errors } } = useForm<RegistrationFormInputs>();
  const authStore = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: RegistrationFormInputs) => {
    try {
      await authStore.register(data);
      navigate('/auth/login'); 
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
          maxWidth: 500,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Регистрация
        </Typography>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2 }}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Введите имя и фамилию' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Имя и Фамилия"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                placeholder="Введите ваше имя и фамилию"
              />
            )}
          />

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
            name="phone"
            control={control}
            rules={{ required: 'Введите номер телефона' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Телефон"
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                placeholder="Введите ваш номер телефона"
              />
            )}
          />

          <Controller
            name="role"
            control={control}
            rules={{ required: 'Введите должность' }}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Должность"
                margin="normal"
                error={!!errors.role}
                helperText={errors.role?.message}
                placeholder="Введите должность"
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

          {authStore.registrationError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {authStore.registrationError}
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={authStore.isRegistrationLoading}
            sx={{ mt: 3, py: 1.5 }}
          >
            {authStore.isRegistrationLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Зарегистрироваться'
            )}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
});

export default RegistrationForm;