import { FC } from "react";
import style from './style.module.scss';


export const NavBar:FC = () => {
  return (
    <div className={style["header-wrap"]}>
      <div className="container">
            <div className={style["navbar-wrap"]}>
                <div className={style.logo}>
                    <p>Кафе-Бар</p>
                    <img src="../../../../public/logo.png" alt="Логотип" className={style["logo-image"]} />
                </div>
                <nav className={style["menu"]}>
                    <ul className={style["menu-list"]}>
                        <li className={style["menu-list-item"]}>
                            <a href="/main">Главная</a>
                        </li>
                        <li className={style["menu-list-item"]}>
                            <a href="/menu">Меню</a>
                        </li>
                        <li className={style["menu-list-item"]}>
                            <a href="/contact-us">Контакты</a>
                        </li>
                        <li className={style["menu-list-item"]}>
                            <a href="#">Новости</a>
                        </li>
                    </ul>
                </nav>
                <div className={style['phone-card']}>
                  <div className={style['phone-image']}>
                    <a href="#">
                      <i className="fa-solid fa-phone"></i>
                    </a>
                  </div>
                  <div className={style['phone-description']}>
                    <p className={style['text-phone']}>Бронирование столика:</p>
                    <p className={style['number']}>+375 (29) 111-99-96</p>
                  </div>
                </div> 
            </div> 
        </div>
    </div>
  )}