import { useState } from "react";
import RandomChar from "../randomChar/randomChar";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";
import decoration from '../../resources/img/bgdecoration.png'

const MainPage = () => {
    const [selectedChar,setChar] = useState(null);

    const onCharSelected = (id) => {
        setChar(id);
    }
    return(
        <>
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
        </>
    )
};
export default MainPage;