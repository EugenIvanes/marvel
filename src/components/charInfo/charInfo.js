import { useState, useEffect } from 'react';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charInfo.scss';
import useMarvelService from '../../services/services';
import PropTypes from 'prop-types';

const CharInfo = (props) =>{
    const [char, setChar] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();
    // eslint-disable-next-line
    useEffect(() => {updateChar()},[props.charId])

    const updateChar = () => {
        const {charId} = props;
        if(!charId) return;
        clearError();
        getCharacter(charId)
            .then(onCharsLoaded);
    }

    const onCharsLoaded = (char)=> {
        setChar(char);
    }

    const skeleton = char || error || loading ? null : <Skeleton/>;
    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return(
        <div className="char__info">
            {skeleton}
            {spinner}
            {errorMessage}
            {content}
        </div>
    )

}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let imgStyle = {objectFit:'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {objectFit:'contain'};
    }
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} style={imgStyle} alt={name}/>
                <div>
                    <div className="char__info_name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : `There is no comics with ${name}`}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if (i > 9) return;
                        return(
                            <li key={i} className="char__comics-item">{item.name}</li>
                        )
                    })
                }
            </ul>
   
        </>
    )
}

CharInfo.protoTypes ={
    chsrId: PropTypes.number
}

export default CharInfo;