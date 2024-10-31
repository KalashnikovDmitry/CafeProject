import { FC } from "react"
import style from './styles.module.scss'


const MainPage:FC = () => {
    return (
        <div className={style['main-bg']}>
            <div className="container">
                <div className={style['main-wrapper']}>
                    <div className={style['main-title']}>
                        <h1>
                            Кафе-бар
                        </h1>
                        <button className={style['reservation-btn']}>Забронировать столик</button>
                    </div>
                    <div className={style.socials}>
                        <a href="https://www.slivki.by/set-minsk-skidka-esenin"  className={style.slivki}>
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSj7UKN3BI7G_ZtD2I7-qwAsiq7_JFxcRV44A&s" alt="slivki"/>
                            <h3>
                                Наши специальные предложения
                            </h3>
                        </a> 
                        <a href="https://esenin.relax.by" className={style.relax}>
                            <img src="data:image/png;base64,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" alt="relax" />
                            <h3>
                                Наша страница на Relax.by
                            </h3>
                        </a>
                    </div>
                </div>
                <div className={style['main-menu-link']}>
                    <h2>
                        Наше меню
                    </h2>
                    <a href="/menu" className={style['link-main-menu']}>Основное меню</a>
                </div>
                <div className={style['main-news-link']}>
                    <h2>
                        Наши новости
                    </h2>
                    <a href="/news" className={style['link-main-news']}>Перейти</a>
                </div>
            </div>
        </div>
    );
};

export default MainPage;