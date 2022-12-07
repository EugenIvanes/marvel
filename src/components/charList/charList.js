import React, { useState, useEffect, useRef } from 'react';
import './charList.scss';
import MarvelService from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const[charList, setCharList]= useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[offset, setOffset] = useState(213);
    const[charEnded, setCharEnded] = useState(false);

    const service = new MarvelService();

    let itemRefs = useRef([]);

    useEffect(() => onRequest(),[])

    const onRequest = (offset) => {
        onCharListLoading();
        service.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError);
    }

    const onCharListLoading = () => {
        setNewItemLoading(true);
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 1);
        setCharEnded(ended);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    function renderItem(arr){
        const item = arr.map(({id, thumbnail, name}, index) => {
            let imgStyle = {objectFit:'cover'};
            if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {objectFit:'unset'};
            }
            return(
                <li key={id} ref={el => itemRefs.current[index] = el} className="char__item" onClick={(e) => {
                    props.onCharSelected(id);
                    focusOnItem(index);
                    }}>
                    <img src={thumbnail} style={imgStyle} alt="abyss"/>
                    <span className="char__name">{name}</span>
                </li>
            )
        })
        return(
            <ul className="char__grid">
                {item}
            </ul>  
        )
    }
    
    const spinner = loading ? <Spinner/> : null;
    const content = renderItem(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    return(
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={()=>onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.protoTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;