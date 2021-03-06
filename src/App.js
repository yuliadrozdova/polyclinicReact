import React, {useEffect, useState} from "react";
import logo from './images/logo.svg';
import './styles/App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import Authorization from "./Authorization";
import Tricks from "./pages/tricks/Tricks";

export default function App() {

    const spinner = document.getElementById('spinner');
    const [classBtnExit, setClassBtnExit] = useState('hidden');
    const [headerPage, setHeaderPage] = useState('');
    const renderHeader = () => {
        if(window.location.pathname.toLowerCase() === "/registration"){
            setHeaderPage('Зарегистрироваться в системе');
            setClassBtnExit('hidden');
        }
        if(window.location.pathname.toLowerCase() === "/"){
            setHeaderPage('Войти в систему');
            setClassBtnExit('hidden');
        }
        if(window.location.pathname.toLowerCase() === "/tricks"){
            setHeaderPage('Приемы');
            setClassBtnExit('visible');
        }
    }

    if (spinner && !spinner.hasAttribute('hidden')) {
        spinner.setAttribute('hidden', 'true');
    }

    useEffect(() => {
        renderHeader();
    }, []);

    const exitAccountClick = async () => {
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
            localStorage.removeItem('refToken');
        }
        window.location.assign('http://localhost:3000/');
    }

    const render = (header, btn) => {
        setHeaderPage(header);
        setClassBtnExit(btn);
    }

    function Header({header, btn}) {

        return (
            <header>
                <img src={logo} className="logo" alt="logo" />
                <h1 className="header-page" >{headerPage}</h1>
                <div className="exit-btn">
                    <button className={classBtnExit} onClick={exitAccountClick}>Выход</button>
                </div>
            </header>
        );
    }

    return (
        <Router>
            <Header header={headerPage} btn={classBtnExit}/>
            <div>
                <Routes>
                    <Route exact path="/" element={
                        <div className="App">
                            <Authorization action={render}/>
                        </div>}/>

                    <Route exact path="/registration" element={
                        <div className="App">
                            <Authorization action={render} />
                        </div>}/>

                    <Route exact path="/tricks" element={
                        <div className="App">
                            <Tricks />
                        </div>}/>
                </Routes>
            </div>
        </Router>

    );
}
