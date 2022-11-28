import './errorMessage.scss';
import deadpool from '../../resources/img/deadpool.png'
const ErrorMessage = () => {
    return(
        <div className="error">
            <span>404 Page not found</span>
            <img src={deadpool} alt="deadpool"/>
        </div>
    )
};
export default ErrorMessage;