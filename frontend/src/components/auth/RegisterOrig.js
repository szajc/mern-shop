import React, { useState, useContext } from 'react'
import Axios from 'axios';
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

export default function Register() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [displayName, setDisplayName] = useState();
    const [getError, setGetError] = useState();

    const {setUserData} = useContext(UserContext);

    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            let newUser = { email, password, passwordCheck, displayName };
            await Axios.post(
                "http://localhost:5000/users/register", 
                newUser,
            );
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login", {
                email,
                password,    
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (error) {
            error.response.data.msg && setGetError(error.response.data.msg);
        }
    }

    return (
        <div className="page">
            <h2>Register</h2>
            { getError &&
                (<ErrorNotice message={getError} clearNotice={() => setGetError(undefined)}  />) 
            }
            <form
                className="form" 
                onSubmit={submit}>
                <label htmlFor="register-email">Email</label>
                <input 
                    id="register-email" 
                    type="email" 
                    onChange={e => setEmail(e.target.value)} />
                <label htmlFor="register-password">Password</label>
                <input 
                    className="register-password" 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}/>
                <input 
                    className="register-password" 
                    placeholder="Verify password" 
                    type="password" 
                    onChange={e => setPasswordCheck(e.target.value)}/>
                <label htmlFor="register-display-name">Display name</label>
                <input 
                    id="register-display-name" 
                    type="text" 
                    onChange={e => setDisplayName(e.target.value)}/>

                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
