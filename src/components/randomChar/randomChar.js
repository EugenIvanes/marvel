import './randomChar.scss';
import decoration from '../../resources/img/Decoration.png'
import {useState, useEffect} from 'react'
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/services';

const RandomChar = () =>{
    const[char, setChar] = useState({});
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(false);

    const marvelService = new MarvelService();

    // eslint-disable-next-line
    useEffect(() => updateChar(),[])

    const onCharLoaded = (char) => {
        const {description} = char;
        if(description.length === 0){
            char.description = "Description is empty";
        }
        setChar(char);
        setLoading(false);
        setError(false);
    }

    const onCharLoading = () => { 
        setLoading(true);
        setError(false);
    }

    const onError = () => {
        setLoading(false);
        setError(true);
    }

    const updateChar = (random = false) => {
        if(!localStorage.getItem('_id') || random){
            localStorage.setItem('_id', JSON.stringify([((Math.random()*699) + 1010801).toFixed(), new Date().getTime() / 1000]));
        }
        const [id, time] = JSON.parse(localStorage.getItem('_id'));

        if(new Date().getTime() / 1000 - time >= 86400){
            updateChar(true)
        };
        
        onCharLoading();
        marvelService
            .getCharacter(id)
            .then(onCharLoaded)
            .catch(onError);
    }
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(error || loading) ? <View char={char}/> : null;
    return (
        <section className="randomchar">
            {errorMessage}
            {spinner}
            {content}
            <div className="randomchar__static">
                <p className="randomchar__title">Random character for today!<br/>
                    Do you want to get to know him better?</p>
                <p className="randomchar__title">Or choose another one</p>
                <button onClick={()=>updateChar(true)} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={decoration} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </section>  
    )
}

const View = ({char}) => {
    const {name, description, homepage, wiki, thumbnail} = char;
    let imgStyle = {objectFit:'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        imgStyle = {objectFit:'contain'};
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="asdas" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div> 
            </div>
        </div>
    )
}

export default RandomChar;