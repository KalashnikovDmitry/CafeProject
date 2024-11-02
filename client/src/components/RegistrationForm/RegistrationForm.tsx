import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegistrationStaff } from '../../store/reducers/PostRegistration/ActionCreators';
import styles from './style.module.scss';

interface RegistrationFormInputs {
  email: string;
  password: string;
  name: string;
  phone: string;
  role: string;
}

const RegistrationForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormInputs>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.loginStaffReducer);
  const navigate = useNavigate();

  const onSubmit = (data: RegistrationFormInputs) => {
    dispatch(fetchRegistrationStaff(data)).then(() => {
      if (!error) {
        navigate('/auth/login'); 
      }
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Имя и Фамилия</label>
          <input
            type="text"
            {...register('name', { required: 'Введите имя и фамилию' })}
            placeholder="Введите ваше имя и фамилию"
            className={styles.input}
          />
          {errors.name && <p className={styles.errorMessage}>{errors.name.message}</p>}
        </div>

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
          <label className={styles.label}>Телефон</label>
          <input
            type="text"
            {...register('phone', { required: 'Введите номер телефона' })}
            placeholder="Введите ваш номер телефона"
            className={styles.input}
          />
          {errors.phone && <p className={styles.errorMessage}>{errors.phone.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Введите должность</label>
          <input
            type="text"
            {...register('role', { required: 'Введите должность' })}
            placeholder="Введите должность"
            className={styles.input}
          />
          {errors.role && <p className={styles.errorMessage}>{errors.role.message}</p>}
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
          {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
        {error && <p className={styles.generalErrorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;