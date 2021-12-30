import React, {useEffect, useState} from 'react';
import polic from './images/polic.svg';
import './styles/registration.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Modal from "react-modal";

function Registration() {
    let navigate = useNavigate();

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [passwordRepeatValue, setPasswordRepeatValue] = useState('');

    const [loginDirty, setLoginDirty] = useState(false);
    const [loginError, setLoginError] = useState('invalid');

    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('invalid');

    const [passwordRepeatDirty, setPasswordRepeatDirty] = useState(false);
    const [passwordRepeatError, setPasswordRepeatError] = useState('invalid');

    const [disabledBtn, setDisabledBtn] = useState('disabled');
    const [showModalError, setShowModalError] = useState(false);

    const [loading, setLoading] = useState(false);
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
            setLoginError('');
            setLoginDirty(false);
        }
    }

    const passwordHandleChange = (e) => {
        const passwordValue = e.target.value;
        setPasswordValue(passwordValue);

        if (passwordValue === ''){
            setPasswordDirty(true);
            setPasswordError('Поле не может быть пустым')
        } else if(passwordValue.length < 6){
            setPasswordDirty(true);
            setPasswordError('Пароль должен содержать минимум 6 символов')
        } else if(!/[A-Za-z]/g.test(passwordValue)){ //допустить только латинские буквы
            setPasswordDirty(true);
            setPasswordError('Пароль должен содержать хотя бы одну букву')
        } else if(!/[?=.*\d]/g.test(passwordValue)){
            setPasswordDirty(true);
            setPasswordError('Пароль должен содержать хотя бы одну цифру')
        } else if(/[?=.*\s]/g.test(passwordValue)) {
            setPasswordDirty(true);
            setPasswordError('Пароль не должен содержать пробелы')
        } else {
            setPasswordError('');
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

    const handleClick = async () => {
        await setLoading(true);
        if (loginDirty === false && passwordDirty === false && passwordRepeatDirty === false){
            await axios.post('http://localhost:4000/createUser', {
                login: loginValue,
                password: passwordValue
            }).then(res => {
                setLoginValue('');
                setPasswordValue('');
                setPasswordRepeatValue('');

                navigate("/Tricks");
            }).catch(error => {
                setShowModalError(true);
            } );
        }else {
            console.log('NO')
        }
        await setLoading(false);
    }
    const autorizationLink = async () => {
        await setLoading(true);
        await navigate("/");
        await setLoading(false);
    }

    useEffect(() => {
        if(passwordRepeatValue !== passwordValue){
            setPasswordRepeatDirty(true);
            setPasswordRepeatError('Введеные пароли не совпадают')
        } else {
            setPasswordRepeatError('')
            setPasswordRepeatDirty(false);
        }

    },[passwordValue, passwordRepeatValue])

    useEffect( async() =>{
        if (!loginDirty && !passwordDirty && !passwordRepeatDirty){
            setDisabledBtn('')
        }else{
            setDisabledBtn('disabled');
        }
    }, [loginDirty, passwordDirty, passwordRepeatDirty]);

    console.log('LOOG', 'RENDER');

  return (
<div className="registration-page">
    {loading && <div className="backgroundLoading">
        <div className="loading"></div>
    </div>}
      <main>
          <div className="col-left"><img src={polic} className="polic-img" alt="polic"/></div>
          <div className="col-right">
              <div className='form'>
                  <h2>Регистрация</h2>

                  <p>Login:</p>
                  <input id="login"  value={loginValue} onChange={loginHandleChange} type="text" placeholder="Login" required />
                  {(loginDirty && loginError) && <div style={{color: 'red'}}>{loginError}</div>}

                  <p>Password:</p>
                  <input id="password" value={passwordValue} onChange={passwordHandleChange} type="password" placeholder="Password" required />
                  {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

                  <p>Repeat password:</p>
                  <input id="passwordRepeat" value={passwordRepeatValue} onChange={passwordRepeatHandleChange} type="password" placeholder="Password" required />
                  {(passwordRepeatDirty && passwordRepeatError) && <div style={{color: 'red'}}>{passwordRepeatError}</div>}

                 <button onClick={handleClick} disabled={disabledBtn}>Зарегистрироваться</button>
                 <button className="link" onClick={autorizationLink}>Авторизоваться</button>

              </div>
          </div>
      </main>

    <Modal className="modal-update" isOpen={showModalError} contentLabel="Example Modal" onRequestClose={onClose}
           shouldCloseOnOverlayClick={true}>
        <div className="modal-header">Ошибка регистрации</div>
        <div className="modal-delete-text">Попробуйте ввести данные еще раз</div>

        <div className="modal-btn-footer">
            <button className='modal-btn-close' onClick={onClose}>Cancel</button>
        </div>
    </Modal>

</div>
  );
}

 export default Registration;
