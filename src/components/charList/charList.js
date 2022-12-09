import React, { useState, useEffect, useRef } from 'react';
import './charList.scss';
import useMarvelService from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

const CharList = (props) => {
    const[charList, setCharList]= useState([]);
    const[newItemLoading, setNewItemLoading] = useState(false);
    const[offset, setOffset] = useState(213);
    const[charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    let itemRefs = useRef([]);
    // eslint-disable-next-line
    useEffect(() => onRequest(offset, true),[])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    }

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }

    const sesionChar = (id) => {
        sessionStorage.setItem('id', JSON.stringify({charId:id}));
        return id;
    }

    function renderItem(arr){
        const item = arr.map(({id, thumbnail, name}, index) => {
            let imgStyle = {objectFit:'cover'};
            if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {objectFit:'unset'};
            }
            return(
                <li key={id} ref={el => itemRefs.current[index] = el} className="char__item" onClick={(e) => {
                    props.onCharSelected(sesionChar(id));
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
    
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
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