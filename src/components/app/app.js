import AppHeader from "../appHeader/appHeader";
import {MainPage, Comics, Page404, SingleComicPage} from "../pages/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () =>{
    return(
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Routes>
                        <Route path="/" element={<MainPage/>}/>
                        <Route path="/comics" element={<Comics/>}/>
                        <Route path="/comics/:comicId" element={<SingleComicPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    )
}
export default App
