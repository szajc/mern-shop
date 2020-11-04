import React, { useState, useContext } from 'react'
import Axios from 'axios';
import UserContext from "../../context/UserContext";
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';
import { Form, Button } from 'react-bootstrap';


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
            <h3>Register</h3>
            { getError &&
                (<ErrorNotice message={getError} clearNotice={() => setGetError(undefined)}  />) 
            }
            <Form onSubmit={submit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword1">
                    <Form.Label>Password check</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password check"
                        onChange={(e) => setPasswordCheck(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Display name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Your display name"
                        onChange={(e) => setDisplayName(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            
        </div>
    )
}
