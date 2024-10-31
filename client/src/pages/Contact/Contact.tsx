import { FC } from "react"
import style from './style.module.scss';

const ContactPage:FC = () => {
    return (
        <div className={style['contact-us']}>
            <div className='container'>
                <div className={style['contact-us-wrapper']}>
                    <div className={style['contact-us-header']}>
                        <h2>Контакты</h2>
                        <p>
                            <a href="/Main">Главная</a> {'>'} Контакты
                        </p>
                    </div>
                    <div className={style['contact-us-card']}>
                        <div className={style['contact-us-phone']}>
                            <div className={style['phone-img']}>
                                <img src="#" alt="phone" />
                            </div>
                            <div className={style["phone-description"]}>
                                <p>Бронирование столика:</p>
                                <p>+375 (29) 111-99-96</p>
                            </div>
                        </div>
                        <div className={style['contact-us-address']}>
                            <div className={style['address-img']}>
                                <img src="#" alt="address" />
                            </div>
                            <div className={style["address-description"]}>
                                <p>Адрес</p>
                                <p>г. Минск, ул. Есенина, хх</p>
                            </div>
                        </div>
                        <div className={style['contact-us-email']}>
                            <div className={style['email-img']}>
                                <img src="#" alt="email" />
                            </div>
                            <div className={style["email-description"]}>
                                <p>Email:</p>
                                <p>eseninbar@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
        </div>
    );
};

export default ContactPage;