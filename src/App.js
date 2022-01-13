import React, {useState} from "react";
import logo from './images/logo.svg';
import './styles/App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link, useNavigate
} from "react-router-dom";
import Registration from './Registration';
import Authorization from "./Authorization";
import Tricks from "./pages/tricks/Tricks";

export default function App() {
    let headerPage = '';
   // const [classBtnExit, setClassBtnExit] = useState('hidden');
    if(Link.to = '/registration'){
        headerPage = 'Зарегистрироваться в системе';
       // setClassBtnExit('hidden');
    }
    if(Link.to = '/'){
        headerPage = 'Войти в систему';
        // setClassBtnExit('hidden');
        // console.log('LOG111 ', Link.to);
    }
    if(Link.to = '/tricks'){
        headerPage = 'Приемы';
        //setClassBtnExit('visible');
    }



    function Header() {
        let navigate = useNavigate();
      //  const [classBtnExit, setClassBtnExit] = useState('hidden');
       /// console.log('LOG111 ', Link.to);

        // if (Link.to !== '/tricks'){
        //     setClassBtnExit('hidden')
        // }else{
        //     setClassBtnExit('visible');
        // }

        // const exitAccountClick = async () => {
        //     if(localStorage.getItem('token')){
        //         localStorage.removeItem('token');
        //     }
        //
        //     await navigate('/');
        //
        // }
        return (
            <header>
                <img src={logo} className="logo" alt="logo" />
                <h1 className="header-page">{headerPage}</h1>
                {/*<div className="exit-btn">*/}
                {/*    <button className={classBtnExit} onClick={exitAccountClick}>Выход</button>*/}
                {/*</div>*/}
            </header>
        );
    }

    return (
        <Router>
            <Header />
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/tricks">Tricks</Link>
                        </li>
                        <li>
                            <Link to="/">Authorization</Link>
                        </li>
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/" element={
                        <div className="App">
                            <Authorization/>
                        </div>}/>

                    <Route exact path="/registration" element={
                    <div className="App">
                        <Registration />
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
