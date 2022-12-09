import './comicsList.scss';
import useMarvelService from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const ComicsList = () => {
    const[comicsList, setComicsList]= useState([]);
    const[offset, setoffset] = useState(1);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[ended, setended] = useState(false);
    const {loading, error, getAllComics} = useMarvelService();

    // eslint-disable-next-line
    useEffect(() => onRequest(offset, true),[])

    const onRequest = (offset, initial)=>{
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset).then(onComicsListLoaded);
    }

    const onComicsListLoaded = (newComicsList) =>{
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComicsList(comicsList=> [...comicsList, ...newComicsList])
        setNewItemLoading(false);
        setoffset(offset => offset + 120);
        setended(ended);
    }

    function renderItem(arr){
        const item = arr.map(({id, title, thumbnail})=>{
            return (
                <li key={id} className="comics__item">
                    <Link to={`/comics/${id}`}>
                        <img src={thumbnail} alt={title}/> 
                        <div className="comics__item-name">{title}</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </Link>
                </li>
            )
        })
        return item;
    }
    const content = renderItem(comicsList);
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    return (
        <div className="comics__list">
                {errorMessage}
                {spinner}
               <ul className="comics__grid">
                    {content}
               </ul>
               <button 
                    onClick={()=>onRequest(offset)} 
                    disabled={newItemLoading} 
                    style={{display: ended ? 'none':'block'}}
                    className="button button__main button__long">
                <div className="inner">load more</div>
                </button>
            </div>
    )
}
export default ComicsList;