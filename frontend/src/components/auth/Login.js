import React, { useState, useContext } from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Form } from 'react-bootstrap';
import ErrorNotice from '../misc/ErrorNotice';
import { Link } from 'react-router-dom'
import Header from '../layout/Header';
import * as actionType from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

import './styles/login.css';

export default function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [getError, setGetError] = useState();
    const prod = useSelector( (state) => state.production);

    const { setUserData } = useContext(UserContext);
    const history = useHistory();
    const dispatch = useDispatch();

    const getCartData = async () => {
        try {
            let token = localStorage.getItem("auth-token");
            await Axios.get( prod + "/cart/all", { headers: { "x-auth-token": token }})
            .then(response => {
                dispatch({ type: actionType.ADD_WHOLE_CART, payload: response.data });
            })
        } catch (error) {
            console.log(error);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password }
            const loginRes = await Axios.post(
                prod + "/users/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            dispatch({type: actionType.AUTHENTICATE, payload: true})
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/shop");
            getCartData();
        } catch (error) {
            console.log(error)
            error.response.data.msg && setGetError(error.response.data.msg);  
        }
    }

    return (
        <div className="login-page">
            <Header />
            <div className="login-form" >
                <h4>Login</h4>
                { getError &&
                    (<ErrorNotice message={getError} clearNotice={() => setGetError(undefined)}  />) 
                }
                <Form className="form-wrap" onSubmit={ (e) => submit(e) }>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            type="email" 
                            placeholder="Enter email" 
                            onChange={(e) => setEmail(e.target.value)} />
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <button 
                        className="login-button"
                        variant="primary" 
                        type="submit">SUBMIT
                    </button>
                </Form>
                <p>Dont have account? <Link to="/register">Sign up</Link></p>
            </div>
        </div>
    )
}
