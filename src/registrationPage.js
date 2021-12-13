// //
// // const registrationPage = onPerfEntry => {
// //
// //     let allUsers = [];
// //     let valueInputLogin = '';
// //     let valueInputPassword = '';
// //     let valueInputPasswordRepeat = '';
// //     let inputLogin = null;
// //     let inputPassword = null;
// //     let inputPasswordRepeat = null;
// //
// //
// //     window.onload = async function init() {
// //         inputLogin = document.getElementById('login');
// //         inputPassword = document.getElementById('password');
// //         inputPasswordRepeat = document.getElementById('passwordRepeat');
// //         // inputLogin.addEventListener('change', updateValueLogin);
// //         // inputPassword.addEventListener('change', updateValuePassword);
// //         // inputPasswordRepeat.addEventListener('change', updateValuePasswordRepeat);
// //
// //         const response = await fetch('http://localhost3000/allUsers', {
// //             method: 'GET'
// //         });
// //         let result = await response.json();
// //         allUsers = result.data;
// //
// //
// //         // render();
// //     }
// //
// //
// //     const createUser = async () => {
// //         const response = await fetch('http://localhost:3000/createUs', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json;charset=utf-8',
// //                 'Access-Control-Allow-Origin': '*'
// //             },
// //             body: JSON.stringify({
// //                 login: valueInputLogin,
// //                 password: valueInputPassword,
// //                 passwordRepeat: valueInputPasswordRepeat
// //             })
// //         });
// //
// //         await allUsers.push({
// //             login: valueInputLogin,
// //             password: valueInputPassword,
// //             passwordRepeat: valueInputPasswordRepeat
// //         });
// //         let result = await response.json();
// //         console.log('r ' + result);
// //         valueInputLogin = '';
// //         valueInputPassword = '';
// //         valueInputPasswordRepeat = '';
// //         inputLogin.value = '';
// //         inputPassword.value = '';
// //         inputPasswordRepeat.value = '';
// //
// //         console.log(valueInputLogin);
// //         console.log(valueInputPassword);
// //         console.log(valueInputPasswordRepeat);
// //         console.log(valueInputLogin.value);
// //         console.log(valueInputPassword.value);
// //         console.log(valueInputPasswordRepeat.value);
// //
// //         console.log(allUsers);
// //         // render();
// //     }
// //
// //     // updateValueLogin = (event) => {
// //     //     valueInputLogin = event.target.value;
// //     // }
// //     // updateValuePassword = (event) => {
// //     //     valueInputPassword = event.target.value;
// //     // }
// //     // updateValuePasswordRepeat = (event) => {
// //     //     valueInputPasswordRepeat = event.target.value;
// //     // }
// //
// //     return createUser;
// //
// // }
// //
// // export default registrationPage;
//
//
// 'use strict';
//
//
// import React from 'react';
// import ReactDOM from 'react-dom';
// import logo from './logo.svg';
// import polic from './polic.svg';
// import './styles/registration.css';
// import registrationPage from './registrationPage';
//
// const e = React.createElement;
//
// function Registration() {
//
//     let valueInputLogin = '';
//     let valueInputPassword = '';
//     let valueInputPasswordRepeat = '';
//     let inputLogin = null;
//     let inputPassword = null;
//     let inputPasswordRepeat = null;
//
//
//     window.onload = async function init() {
//         inputLogin = document.getElementById('login');
//         inputPassword = document.getElementById('password');
//         inputPasswordRepeat = document.getElementById('passwordRepeat');
//     }
//
//
//     const createUser = async () => {
//         const response = await fetch('http://localhost:3000/createUs', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//                 'Access-Control-Allow-Origin': '*'
//             },
//             body: JSON.stringify({
//                 login: valueInputLogin,
//                 password: valueInputPassword,
//                 passwordRepeat: valueInputPasswordRepeat
//             })
//         });
//
//
//         let result = await response.json();
//         console.log('r ' + result);
//
//
//         console.log(valueInputLogin);
//         console.log(valueInputPassword);
//         console.log(valueInputPasswordRepeat);
//         console.log(valueInputLogin.value);
//         console.log(valueInputPassword.value);
//         console.log(valueInputPasswordRepeat.value);
//
//
//
//     }
//
//
//     return (
//         <div className="reg-page">
//             <header>
//                 <img src={logo} className="logo" alt="logo" />
//                 <h1 className="header-page">Зарегистрироваться в системе</h1>
//             </header>
//
//             <main>
//                 <div className="col-left"><img src={polic} className="polic-img" alt="polic"/></div>
//                 <div className="col-right">
//                     <form>
//                         <h2>Регистрация</h2>
//
//                         <p>Login:</p>
//                         <input id="login" type="text" placeholder="Login"/>
//                         <p>Password:</p>
//                         <input id="password" type="password" placeholder="Password"/>
//                         <p>Repeat password:</p>
//                         <input id="passwordRepeat" type="password" placeholder="Password"/>
//
//                         <button onClick={() => createUser()}>Зарегистрироваться</button>
//                         <a href="#">Авторизоваться</a>
//
//                     </form>
//                 </div>
//             </main>
//         </div>
//     );
//
// }
// const domContainer = document.querySelector('#createUser');
// ReactDOM.render(e(Registration()), domContainer);
// export default Registration;
