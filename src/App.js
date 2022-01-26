import React, {useEffect, useState} from "react";
import logo from './images/logo.svg';
import './styles/App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import Registration from './Registration';
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
        console.log('111 ', window.location.pathname)
        if(window.location.pathname.toLowerCase() === "/tricks"){
            setHeaderPage('Приемы');
            setClassBtnExit('visible');
        }
    }

    if (spinner && !spinner.hasAttribute('hidden')) {
        spinner.setAttribute('hidden', 'true');
    }

    useEffect(() => {
        console.log('pathname ', window.location.pathname);
        renderHeader();
    }, []);

    const exitAccountClick = async () => {
        if(localStorage.getItem('token')){
            localStorage.removeItem('token');
        }
        window.location.assign('http://localhost:3000/');
    }

    const testrender = (header, btn) => {
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
                            <Authorization action={testrender}/>
                        </div>}/>

                    <Route exact path="/registration" element={
                    <div className="App">
                        <Registration action={testrender} />
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
