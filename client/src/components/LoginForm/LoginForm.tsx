import React from 'react';
import { useForm } from 'react-hook-form';
import { fetchLoginStaff } from '../../store/reducers/PostLogin/ActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

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
        navigate('/admin/staffs'); 
      }
    });
  };

  return (
    <div className={styles.formContainer}>
    <h2 className={styles.title}>Вход</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputContainer}>
        <label className={styles.label}>Email</label>
        <input
          type="email"
          {...register('email', { required: 'Введите email' })}
          placeholder="Введите ваш email"
          className={styles.input}
        />
        {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
      </div>

      <div className={styles.inputContainer}>
        <label className={styles.label}>Пароль</label>
        <input
          type="password"
          {...register('password', { required: 'Введите пароль' })}
          placeholder="Введите ваш пароль"
          className={styles.input}
        />
        {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isLoading} className={styles.submitButton}>
        {isLoading ? 'Загрузка...' : 'Войти'}
      </button>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </form>
    <button
      type="button"
      disabled={isLoading}
      className={styles.registrationButton}
      onClick={() => navigate('/auth/registration')}
    >
      {isLoading ? 'Загрузка...' : 'Регистрация пользователя'}
    </button>
  </div>
  );
};

export default LoginForm;