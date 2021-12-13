import React from "react";
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
import Tricks from "./Tricks";

export default function App() {
    let headerPage = '';
    if(Link.to = '/registration'){
        headerPage = 'Зарегистрироваться в системе'
    }
    if(Link.to = '/authorization'){
        headerPage = 'Войти в систему'
    }
    if(Link.to = '/tricks'){
        headerPage = 'Приемы'
    }



    function Header() {
        return (
            <header>
                <img src={logo} className="logo" alt="logo" />
                <h1 className="header-page">{headerPage}</h1>
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
                            <Link to="/allTricks">Tricks</Link>
                        </li>
                        <li>
                            <Link to="/authorization">Authorization</Link>
                        </li>
                        <li>
                            <Link to="/registration">Registration</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route exact path="/authorization" element={
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

// function Home() {
//     return <h2>Home</h2>;
// }

// function About() {
//     return <h2>About</h2>;
// }

// function Users() {
//     return <h2>Users</h2>;
// }