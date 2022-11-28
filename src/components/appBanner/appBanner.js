import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengers_logo from '../../resources/img/Avengers-logo.png';
const AppBanner = () => {
    return(
        <div className="app__banner">
                <img src={avengers} alt="asdas"/>
                <div className="app__banner-text">New comics every week! <br />
                    Stay tuned!</div>
                <img src={avengers_logo} alt="asdas"/>
        </div>
    )
};
export default AppBanner;