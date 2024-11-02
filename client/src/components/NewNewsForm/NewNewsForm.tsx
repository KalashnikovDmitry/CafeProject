/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { fetchPostNews } from '../../store/reducers/PostNews/ActionCreators';

interface newNewsFormInputs {
  title: string;
  content: string;
  image: string;
}

const newNewsForm: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<newNewsFormInputs>();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.newsReducer);
  const navigate = useNavigate();

  const onSubmit = (data: newNewsFormInputs) => {
    dispatch(fetchPostNews(data)).then(() => {
      if (!error) {
        navigate('/admin/staffs'); 
      }
    });
  };

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.title}>Добавить новость</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label className={styles.label}>Название</label>
          <input
            type="text"
            {...register('title', { required: 'Введите название новости' })}
            placeholder="Введите название новости"
            className={styles.input}
          />
          {errors.title && <p className={styles.errorMessage}>{errors.title.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Описание</label>
          <textarea
            {...register('content', { required: 'Введите новость' })}
            placeholder="Введите новость"
            className={styles.input}
          />
          {errors.content && <p className={styles.errorMessage}>{errors.content.message}</p>}
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label}>Изображение</label>
          <input
            type="file"
            {...register('image', { required: 'Выберите изображение' })}
            placeholder="Выберите изображение"
            className={styles.input}
            
          />
          {errors.image && <p className={styles.errorMessage}>{errors.image.message}</p>}
        </div>
        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Загрузка...' : 'Отправить'}
        </button>
        {error && <p className={styles.generalErrorMessage}>{error}</p>}
      </form>
    </div>
  );
};

export default newNewsForm;