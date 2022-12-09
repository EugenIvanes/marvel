import AppHeader from "../appHeader/appHeader";
import MainPage from "../pages/MaingPage";
import Comics from "../pages/Comics";
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
                    </Routes>
                </main>
            </div>
        </Router>
    )
}
export default App
