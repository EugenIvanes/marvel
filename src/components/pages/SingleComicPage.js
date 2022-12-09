import './singleComicPage.scss';
import { useParams , useNavigate} from 'react-router-dom';
import useMarvelService from '../../services/services';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
// import x_men from '../../resources/img/x-men.png'
const SingleComicPage = () =>{
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);
    const {loading, error, getComic, clearError} = useMarvelService();
    const navigate = useNavigate();
    // eslint-disable-next-line
    useEffect(() =>onRequest(),[comicId])

    const onRequest = () => {
        clearError();
        getComic(comicId).then(onComicLoaded);
    }

    const onComicLoaded = (comics) => {
        setComic(comics);
    }

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} navigate={navigate}/> : null;
    return(
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

const View = ({comic, navigate}) => {
    const {title, thumbnail, description, pages, price, language} = comic;

    let imgStyle = {objectFit:'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {objectFit:'unset'};
    }

    return(
        <div className="single-comics">
            <img src={thumbnail} style={imgStyle} alt={title}/>
            <div className="single-comics__info">
                <div className="single-comics__name">{title}</div>
                <div className="single-comics__descr">{description}</div>
                <div className="single-comics__descr">{`${pages} ${pages > 1 ? "pages" : "page"}`}</div>
                <div className="single-comics__descr">Language: {language}</div>
                <div className="single-comics__price">{price}</div>
            </div>
            <div className="single-comics__back">
                <b onClick={()=>navigate(-1)}>Back</b>
            </div>
        </div>
    )
}

export default SingleComicPage;