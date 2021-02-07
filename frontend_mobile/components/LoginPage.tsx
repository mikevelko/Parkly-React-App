import React, { useState, useEffect } from 'react';
import { fetchLogin } from './FetchUtils';


var bcrypt = require('bcryptjs');

export default function LoginPage(props) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    
    const onSubmitHandler = () => {
        const salt = "$2a$10$izu4Vqz1ynE4UeFKDqz3K.";
        const encrypted = bcrypt.hashSync(password, salt);
        fetchLogin("/authorization/login", {
            login: login,
            password: encrypted
        }, "POST").then((value) => {
            props.setSecurityToken(value);
            console.log(value);
            if(value!=null)
            {
                props.navigation.navigate('Home');
            }
        });
        
    }
    return (
        <div style={{
            width: '100px',
            margin: '0 auto'
        }}>
            <form>
                <label>
                    <p>Login</p>
                    <input type="text" onChange={(e) => setLogin(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="button" onClick={() => onSubmitHandler()}>Submit</button>
                </div>
            </form>
        </div>
    )
}