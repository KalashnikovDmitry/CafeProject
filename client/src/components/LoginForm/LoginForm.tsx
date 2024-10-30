import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchLoginStaff } from '../../store/reducers/PostLogin/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.loginStaffReducer);
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormInputs) => {
    dispatch(fetchLoginStaff(data)).then(() => {
      if (!error) {
        navigate('/staff'); 
      }
    });
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input
            type="email"
            {...register('email', { required: 'Введите email' })}
            placeholder="Введите ваш email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Пароль</label>
          <input
            type="password"
            {...register('password', { required: 'Введите пароль' })}
            placeholder="Введите ваш пароль"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Загрузка...' : 'Войти'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <button type="button" disabled={isLoading} onClick={() => navigate('/auth/registration')}>
          {isLoading ? 'Загрузка...' : 'Регистрация пользователя'}
        </button>
    </div>
  );
};

export default LoginForm;