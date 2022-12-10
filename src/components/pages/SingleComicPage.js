import './singleComicPage.scss';
import { useParams , useNavigate} from 'react-router-dom';
import useMarvelService from '../../services/services';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import ImageViewer from 'react-simple-image-viewer';

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
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const toggleImageViewer = () => {
        setIsViewerOpen(isViewerOpen => !isViewerOpen);
    };

    let imgStyle = {objectFit:'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {objectFit:'unset'};
    }

    const imageViewer = isViewerOpen ? <SimpleImageViewer img={thumbnail} closeImageViewer={toggleImageViewer}/> : null;

    return(
        <>
            <div className="single-comics">
                <img src={thumbnail} style={{...imgStyle, cursor:"pointer"}} onClick={ () => toggleImageViewer() } alt={title}/>
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
            {imageViewer}
        </>
    )
}

const SimpleImageViewer = ({img, closeImageViewer}) => {
    return(
        <ImageViewer
          src={[img]}
          disableScroll={ true }
          closeOnClickOutside={ true }
          onClose={ closeImageViewer }
        />
    )
}

export default SingleComicPage;