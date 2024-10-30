import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegistrationStaff } from '../../store/reducers/PostRegistration/ActionCreators';

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
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Имя и Фамилия</label>
          <input
            type="text"
            {...register('name', { required: 'Введите имя и фамилию' })}
            placeholder="Введите ваше имя и фамилию"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>

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
          <label>Телефона</label>
          <input
            type="text"
            {...register('phone', { required: 'Введите номер телефона' })}
            placeholder="Введите ваш номер телефона"
          />
          {errors.phone && <p>{errors.phone.message}</p>}
        </div>

        <div>
          <label>Введите должность</label>
          <input
            type="text"
            {...register('role', { required: 'Введите должность' })}
            placeholder="Введите должность"
          />
          {errors.role && <p>{errors.role.message}</p>}
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
          {isLoading ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default RegistrationForm;