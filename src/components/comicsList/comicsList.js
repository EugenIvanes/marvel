import './comicsList.scss';
import x_men from '../../resources/img/x-men.png'
const ComicsList = () => {
    return (
        <div className="comics__list">
               <ul className="comics__grid">
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src={x_men} alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="comics-info.html">
                        <img src="./img/x-men.png" alt=""/> 
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
               </ul>
               <button className="button button__main button__long">
                <div className="inner">load more</div>
                </button>
            </div>
    )
}
export default ComicsList;