import { Component } from 'react';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charInfo.scss';
import MarvelService from '../../services/services';
import PropTypes from 'prop-types';
class CharInfo extends Component{
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount(){
        this.updateChar();
    }

    componentDidUpdate(prevProps) {
        if(this.props.charId !== prevProps.charId){
            this.updateChar();
        }
    }

    updateChar = () => {
        const {charId} = this.props
        if(!charId) return;

        this.onCharsLoading();
        this.marvelService
        .getCharacter(charId)
        .then(this.onCharsLoaded)
        .catch(this.onError);
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    onCharsLoading = () => {
        this.setState({loading: true, error: false});
    }

    onCharsLoaded = (char)=> {
        this.setState({char, loading: false, error: false});
    }

    render(){
        const {loading, error, char} = this.state;
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