import React, { useState, useEffect } from 'react';
import { fetchData } from '../FetchUtils';
import { useHistory } from 'react-router-dom';
import './style.css'

const bcrypt = require('bcryptjs');

export default function LoginPage(props) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const history = useHistory();

    useEffect(() => {
        if (props.token) {
            history.push("/");
        }
    }, [props.token]);

    const onSubmitHandler = () => {
        const salt = "$2a$10$izu4Vqz1ynE4UeFKDqz3K.";
        const encrypted = bcrypt.hashSync(password, salt);
        fetchData("/authorization/login", {
            login: login,
            password: encrypted
        }, "POST").then((value) => {
            props.setToken(value);
        });
    }
    return (
        <div className="centering-wrapper">
            <form className="login-flex">
                <div className="inner-horizontal">
                    <label className="login-text">Login</label>
                    <input className="add-input" type="text" onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="inner-horizontal">
                    <label className="login-text">Password</label>
                    <input className="add-input" type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <button className="overview-top-button" type="button" onClick={() => onSubmitHandler()}>Submit</button>
                </div>
            </form>
        </div>
    )
}