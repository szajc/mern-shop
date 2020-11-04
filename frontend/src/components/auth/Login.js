import React, { useState, useContext } from 'react'
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import { Form, Button } from 'react-bootstrap';
import ErrorNotice from '../misc/ErrorNotice';

export default function Login() {
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [getError, setGetError] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password }
            const loginRes = await Axios.post(
                "http://localhost:5000/users/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            history.push("/");
        } catch (error) {
            console.log(error)
            error.response.data.msg && setGetError(error.response.data.msg);  
        }
    }

    return (
        <div className="page">
            <h2>Login</h2>
            { getError &&
                (<ErrorNotice message={getError} clearNotice={() => setGetError(undefined)}  />) 
            }
            <Form onSubmit={submit}>
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
                <Button 
                    variant="primary" 
                    type="submit">Submit
                </Button>
            </Form>
            
        </div>
    )
}
