import React, { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/services';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1541,
        charEnded: false,
    }
    
    service = new MarvelService();

    itemRefs = [];

    setInputRef = ref => {
        this.itemRefs.push(ref);
    }

    componentDidMount(){
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.service.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        });
    };

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }
        this.setState(({offset, charList})=>({
            charList:[...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();

    }

    renderItem = (arr) =>{
        const item = arr.map(({id, thumbnail, name}, index) => {
            let imgStyle = {objectFit:'cover'};
            if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
                imgStyle = {objectFit:'unset'};
            }
            return(
                <li key={id} ref={this.setInputRef} className="char__item" onClick={(e) => {
                    this.props.onCharSelected(id);
                    console.log(index);
                    this.focusOnItem(index);
                    // e.target.classList.add('char__item_selected');
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
    
    

    render() {
        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        const spinner = loading ? <Spinner/> : null;
        const content = this.renderItem(charList);
        console.log(content);
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
                    onClick={()=>this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

CharList.protoTypes = {
    onCharSelected: PropTypes.func
}
CharList.defaultProps = {
    id: 1
};
export default CharList;