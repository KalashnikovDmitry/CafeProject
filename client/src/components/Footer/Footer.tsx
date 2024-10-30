import style from './style.module.scss'

const Footer = () => {
    return (
      <footer className={style.footer}>
        <div className="container">
            <div className={style['footer-icons-wrap']}>
                <nav className={style['footer-wrap']}>
                    <ul className={style['footer-icons']}>
                        <li className={style['footer-item']}>
                            <a href="https://www.facebook.com">
                                <i className="fa-brands fa-facebook"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://twitter.com/">
                                <i className="fa-brands fa-square-x-twitter"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://www.google.com">
                                <i className="fa-brands fa-square-google-plus"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://www.pinterest.com">
                                <i className="fa-brands fa-square-pinterest"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://www.instagram.com">
                                <i className="fa-brands fa-square-instagram"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://ru.linkedin.com">
                                <i className="fa-brands fa-linkedin"></i>
                            </a>
                        </li>
                        <li className={style['footer-item']}>
                            <a href="https://www.tiktok.com/ru-RU/">
                                <i className="fa-brands fa-tiktok"></i>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <p className={style.footer_description}>
                © 2024 Кафе-Бар Есенин. Все права защищены.
            </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;