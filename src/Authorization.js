import React, {useState, useEffect} from 'react';
import axios from "axios";
import polic from './images/polic.svg';
import './styles/authorization.css';
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

function Authorization() {
    let navigate = useNavigate();

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [loginDirty, setLoginDirty] = useState(true);
    const [loginError, setLoginError] = useState('');
    const [passwordDirty, setPasswordDirty] = useState(true);
    const [passwordError, setPasswordError] = useState('');
    const [showModalError, setShowModalError] = useState(false);
    const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [loading, setLoading] = useState(false);

    const onClose = () => {
        setShowModalError(false)
    }

    const loginHandleChange = (e) => {
        const loginValue = e.target.value;
        console.log(loginValue);
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

    const loginClick = async () => {
        await setLoading(true);
        // console.log('loginValue ', loginValue);
        // await setLoginValue(loginValue.trim());
        // passwordValue.trim();
        // await console.log('loginValue.trim() ', loginValue);

            if (loginDirty === false && passwordDirty === false) {
                await axios.post('http://localhost:4000/loginUser', {
                    login: loginValue,
                    password: passwordValue
                }).then(res => {
                    //console.log('res ', res.data.token)
                    if(localStorage.getItem('token')){
                        localStorage.removeItem('token');
                    }
                    localStorage.setItem('token', res.data.token);
                    //console.log(localStorage.getItem('token'));
                    setLoginValue('');
                    setPasswordValue('');

                    navigate("/Tricks");
                }).catch(error => {
                    setShowModalError(true);
                } );
            }else {
                console.log('error login')
            }

        await setLoading(false);
    }

    const registrationLink = async () => {
        await setLoading(true);
        await navigate("/registration");
        await setLoading(false);
    }

    useEffect( async() =>{
        if (loginDirty === false && passwordDirty === false){
            setDisabledBtn('')
        }else{
            setDisabledBtn('disabled');
        }
    }, [loginDirty, passwordDirty]);

    console.log('LOOG', 'RENDER');

    return (
<div className="authorization-page">
    {loading && <div className="backgroundLoading">
        <div className="loading"></div>
    </div>}

      <main>
          <div className="col-left"><img src={polic} className="polic-img" alt="polic"/></div>
          <div className="col-right">
              <div className="form">
                  <h2>Войти в систему</h2>

                  <p>Login:</p>
                  <input id="login"  value={loginValue} onChange={loginHandleChange} type="text" placeholder="Login" required />
                  {(loginDirty && loginError) && <div style={{color: 'red'}}>{loginError}</div>}

                  <p>Password:</p>
                  <input id="password" value={passwordValue} onChange={passwordHandleChange} type="password" placeholder="Password" required />
                  {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

                  <button onClick={loginClick} disabled={disabledBtn}>Войти</button>
                  <button className="link" onClick={registrationLink}>Зарегистрироваться</button>

              </div>
          </div>
      </main>

    <Modal className="modal-update" isOpen={showModalError} contentLabel="Example Modal" onRequestClose={onClose}
           shouldCloseOnOverlayClick={true}>
        <div className="modal-header">Ошибка аутентификации</div>
        <div className="modal-delete-text">Данный пользователь не был найден. Попробуйте ввести данные еще раз</div>

        <div className="modal-btn-footer">
            <button className='modal-btn-close' onClick={onClose}>Close</button>
        </div>
    </Modal>

</div>
  );
}

 export default Authorization;