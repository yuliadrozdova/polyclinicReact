 import React, {useState, useEffect} from 'react';
 import { useNavigate } from "react-router-dom";
 import Modal from "react-modal";
 import axios from "axios";
 import polic from './images/polic.svg';
 import './styles/authorization.css';

 function Authorization(props) {
     let navigate = useNavigate();
     let locationHref = window.location.href.includes('registration');

     const [loginValue, setLoginValue] = useState('');
     const [passwordValue, setPasswordValue] = useState('');
     const [passwordRepeatValue, setPasswordRepeatValue] = useState('');
     const [loginDirty, setLoginDirty] = useState(false);
     const [loginError, setLoginError] = useState('');
     const [passwordDirty, setPasswordDirty] = useState(false);
     const [passwordError, setPasswordError] = useState('');
     const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false);
     const [passwordRepeatError, setPasswordRepeatError] = useState('');
     const [showModalError, setShowModalError] = useState(false);
     const [disabledBtn, setDisabledBtn] = useState('');
     const [loading, setLoading] = useState(false);
     let disabledButton = () => {
         if(!locationHref){
             setPasswordRepeatDirty(false);
         }
         if (!loginDirty && !passwordDirty && !passwordRepeatDirty){
             return setDisabledBtn('')
         }else{
             return setDisabledBtn('disabled');
         }
     }
     const onClose = () => {
         setShowModalError(false)
     }

     const loginHandleChange = (e) => {
         const loginValue = e.target.value;
         setLoginValue(loginValue);

         if (loginValue === ''){
             setLoginDirty(true);
             setLoginError('Поле не может быть пустым')
         } else if(loginValue.length < 6){
             setLoginDirty(true);
             setLoginError('Логин должен содержать минимум 6 символов')
         } else {
             setLoginError('')
             setLoginDirty(false);
         }
     }

     const passwordHandleChange = (e) => {
         const passwordValue = e.target.value;
         setPasswordValue(passwordValue);

         if (passwordValue === '') {
             setPasswordDirty(true);
             setPasswordError('Поле не может быть пустым')
         } else if(passwordValue.length < 6){
             setPasswordDirty(true);
             setPasswordError('Пароль должен содержать минимум 6 символов')
         } else if(/[А-Яа-яЁё]/g.test(passwordValue)){ //допустить только латинские буквы
             setPasswordDirty(true);
             setPasswordError('Используйте только латинские буквы')
         } else if(!/[A-Za-z]/g.test(passwordValue)){
             setPasswordDirty(true);
             setPasswordError('Пароль должен содержать хотя бы одну букву')
         } else if(!/[?=.*\d]/g.test(passwordValue)){
             setPasswordDirty(true);
             setPasswordError('Пароль должен содержать хотя бы одну цифру')
         } else if(/[?=.*\s]/g.test(passwordValue)) {
             setPasswordDirty(true);
             setPasswordError('Пароль не должен содержать пробелы')
         } else {
             setPasswordError('')
             setPasswordDirty(false);
         }
     }
     const passwordRepeatHandleChange = (e) => {
         const passwordRepeatValue = e.target.value;
         setPasswordRepeatValue(passwordRepeatValue);

         if (passwordRepeatValue === ''){
             setPasswordRepeatDirty(true);
             setPasswordRepeatError('Поле не может быть пустым')
         }else {
             setPasswordRepeatDirty(false);
         }
     }
     const loginClick = async () => {
         await setLoading(true);
            try{
                if (loginValue.trim() !== '' && passwordValue.trim() !== '' && loginDirty === false && passwordDirty === false) {
                    await axios.post('http://localhost:4000/loginUser', {
                        login: loginValue,
                        password: passwordValue
                    }).then(res => {
                        if(localStorage.getItem('token')){
                            localStorage.removeItem('token');
                            localStorage.removeItem('refToken');
                        }
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('refToken', res.data.refToken);
                        setLoginValue('');
                        setPasswordValue('');
                        props.action('Приемы', 'visible')
                        navigate("/tricks");

                    }).catch(error => {
                        setShowModalError(true);
                    } );
                }
            }catch (err){
                console.error('ERROR LOGIN:', err)
            }

         await setLoading(false);
     }
     /**
      * {}
      * @returns {Promise<void>}
      */
     const registrClick = async () => { //registration axios
         disabledButton();

         await setLoading(true);
         try{
             if (loginValue.trim() !== ''
                 && passwordValue.trim() !== ''
                 && passwordRepeatValue.trim() !== ''
                 && loginDirty === false
                 && passwordDirty === false
                 && passwordRepeatDirty === false){
                 await axios.post('http://localhost:4000/createUser', {
                     login: loginValue,
                     password: passwordValue
                 }).then(res => {
                     if(localStorage.getItem('token')){
                         localStorage.removeItem('token');
                         localStorage.removeItem('refToken');
                     }
                     localStorage.setItem('token', res.data.token);
                     localStorage.setItem('refToken', res.data.refToken);
                     setLoginValue('');
                     setPasswordValue('');
                     setPasswordRepeatValue('');
                     props.action('Приемы', 'visible')
                     navigate("/tricks");
                 }).catch(error => {
                     setShowModalError(true);
                 } );
             }
         }catch (err){
             console.error('ERROR REGISTRATION:', err)
         }

         await setLoading(false);
     }

     const registrationLink = async () => {
         await setLoading(true);
         props.action('Зарегистрироваться в системе', 'hidden')
         await navigate("/registration");
         await setPasswordRepeatDirty(true);
         await setLoading(false);
     }

     const authorizationLink = async () => {
         await setLoading(true);
         props.action('Войти в систему', 'hidden')
         await navigate("/");
         await setPasswordRepeatDirty(false);
         await setLoading(false);

     }

     useEffect( () =>{
         disabledButton();

     }, [loginDirty, passwordDirty, passwordRepeatDirty]);

     useEffect(() => {
         if(locationHref){
             if(passwordRepeatValue === ''){
                 setPasswordRepeatDirty(true);
                 setPasswordRepeatError('Поле не может быть пустым')
             }else if(passwordRepeatValue !== passwordValue){
                 setPasswordRepeatDirty(true);
                 setPasswordRepeatError('Введеные пароли не совпадают')
             } else {
                 setPasswordRepeatError('')
                 setPasswordRepeatDirty(false);
             }
         }
     },[passwordValue, passwordRepeatValue])
     return (
 <div className="authorization-page">
     {loading && <div className="backgroundLoading">
         <div className="loading"></div>
     </div>}

       <main>
           <div className="col-left"><img src={polic} className="polic-img" alt="polic"/></div>
           <div className="col-right">
               <div className="form">
                   {!locationHref &&  <h2>Войти в систему</h2>}
                   {locationHref &&  <h2>Регистрация</h2>}

                   <p>Login:</p>
                   <input id="login"  value={loginValue} onChange={loginHandleChange} type="text" placeholder="Login" required />
                   {(loginDirty && loginError) && <div style={{color: 'red'}}>{loginError}</div>}

                   <p>Password:</p>
                   <input id="password" value={passwordValue} onChange={passwordHandleChange} type="password" placeholder="Password" required />
                   {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

                   {locationHref &&  <p>Repeat password:</p>}
                   {locationHref && <input id="passwordRepeat" value={passwordRepeatValue} onChange={passwordRepeatHandleChange} type="password" placeholder="Password" required />}
                   {locationHref && (passwordRepeatDirty && passwordRepeatError) && <div style={{color: 'red'}}>{passwordRepeatError}</div>}

                   {!locationHref && <button onClick={loginClick} disabled={disabledBtn}>Войти</button>}
                   {!locationHref && <button className="link" onClick={registrationLink}>Зарегистрироваться</button>}

                   {locationHref && <button onClick={registrClick} disabled={disabledBtn}>Зарегистрироваться</button>}
                   {locationHref && <button className="link" onClick={authorizationLink}>Авторизоваться</button>}


               </div>
           </div>
       </main>

     { !locationHref && <Modal className="modal-update" isOpen={showModalError} contentLabel="Example Modal" onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}>
         <div className="modal-header">Ошибка аутентификации</div>
         <div className="modal-delete-text">Данный пользователь не был найден. Попробуйте ввести данные еще раз</div>

         <div className="modal-btn-footer">
             <button className='modal-btn-close' onClick={onClose}>Close</button>
         </div>
     </Modal>}
     { locationHref && <Modal className="modal-update" isOpen={showModalError} contentLabel="Example Modal" onRequestClose={onClose}
            shouldCloseOnOverlayClick={true}>
         <div className="modal-header">Ошибка регистрации</div>
         <div className="modal-delete-text">Пользователь с таким логином уже существует. Попробуйте ввести данные еще раз</div>

         <div className="modal-btn-footer">
             <button className='modal-btn-close' onClick={onClose}>Close</button>
         </div>
     </Modal>}

 </div>
   );
 }

  export default Authorization;