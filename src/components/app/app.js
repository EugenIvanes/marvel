import { Component } from "react";
import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";
import decoration from '../../resources/img/bgdecoration.png'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component{
    state = {
        selectedChar: null
    };

    onCharSelected = (id) => {
        this.setState({selectedChar: id});
    }

    render() {
        const {selectedChar} = this.state;
        return(
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/> 
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected}/>
                        <ErrorBoundary>
                            <CharInfo charId={selectedChar}/>
                        </ErrorBoundary>
                        
                    </div> 
                    <img className="bg-decoration" src={decoration} alt="" /> 
                </main>
            </div>
        )
    }
}
export default App
