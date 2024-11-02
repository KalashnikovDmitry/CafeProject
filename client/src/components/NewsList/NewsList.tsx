import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchGetNews } from '../../store/reducers/GetNews/ActionCreators';
import { INews } from '../../models/INews';
import style from './style.module.scss'



const NewsList: React.FC = () => {
 
    const dispatch = useAppDispatch();
    const { news, isLoading, error } = useAppSelector(state => state.getNewsReducer);
  
    useEffect(() => {
      dispatch(fetchGetNews());
    }, [dispatch]);
  
    if (isLoading) {
      return <div className={style.loading}>Загрузка...</div>;
    }
  
    if (error) {
      return <div className={style.error}>Ошибка: {error}</div>;
    }
  return (

       <div className={style['news-list']}>
            {news.length === 0 ? (
                <div className={style['no-news']}>Новостей нет.</div>
            ) : (
                news.map((item: INews) => (
                    <div key={item.id} className={style['news-item']}>
                        <div className={style['news-item-description']}>
                            <h2 className={style['news-title']}>{item.title}</h2>
                            <p className={style['news-content']}>{item.content}</p>
                            <p className={style['news-date']}>Опубликовано: {new Date(item.createdAt).toLocaleDateString()}</p>
                        </div>
                        {item.image && <div className={style['news-image-wrapper']}>
                            <img src={`http://localhost:5000/${item.image}`} alt={item.title} className={style['news-image']} />
                        </div>}
                    </div>
                ))      
            )}
        </div>
    
  );
};

export default NewsList;