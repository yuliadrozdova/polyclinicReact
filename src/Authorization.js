import React, {useState} from 'react';
import axios from "axios";
import polic from './images/polic.svg';
import './styles/authorization.css';

function Authorization() {

    const [loginValue, setLoginValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const [loginDirty, setLoginDirty] = useState(false);
    const [loginError, setLoginError] = useState('invalid');

    const [passwordDirty, setPasswordDirty] = useState(false);
    const [passwordError, setPasswordError] = useState('invalid');

    let countError = 2;

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
            countError -= countError;
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
            setPasswordError('')
            countError -= countError;
        }
        console.log(countError)
    }

    console.log('LOOG', 'RENDER');

    const loginClick = async () => {
        console.log(countError)
        if (countError === 0) {
            await axios.post('http://localhost:4000/loginUser', {
                login: loginValue,
                password: passwordValue
            }).then(res => {
                setLoginValue('');
                setPasswordValue('');
                console.log('111 ' + res.data.data);

            });
            window.open('/Tricks');
        }else {
            // window.open('/Tricks');
            console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
        }
    }

    return (
<div className="authorization-page">
      <main>
          <div className="col-left"><img src={polic} className="polic-img" alt="polic"/></div>
          <div className="col-right">
              <form>
                  <h2>Войти в систему</h2>

                  <p>Login:</p>
                  <input id="login"  value={loginValue} onChange={loginHandleChange} type="text" placeholder="Login" required />
                  {(loginDirty && loginError) && <div style={{color: 'red'}}>{loginError}</div>}

                  <p>Password:</p>
                  <input id="password" value={passwordValue} onChange={passwordHandleChange} type="password" placeholder="Password" required />
                  {(passwordDirty && passwordError) && <div style={{color: 'red'}}>{passwordError}</div>}

                  <button onClick={() => loginClick()}>Войти</button>
                  <a href="/registration">Зарегистрироваться</a>

              </form>
          </div>
      </main>
</div>
  );
}

 export default Authorization;
