import { useState } from "react";
import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";
import decoration from '../../resources/img/bgdecoration.png'
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const App = () =>{
    const [selectedChar,setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }
    return(
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/> 
                <div className="char__content">
                    <ErrorBoundary>
                        <CharList onCharSelected={onCharSelected}/>
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>
                    </ErrorBoundary>
                    
                </div> 
                <img className="bg-decoration" src={decoration} alt="" /> 
            </main>
        </div>
    )
}
export default App
