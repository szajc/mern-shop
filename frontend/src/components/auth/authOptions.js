import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { useDispatch } from "react-redux";
import * as actionType from '../../store/actions';

const AuthOptions = () => {
    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();
    const dispatch = useDispatch();

    const register = () => {history.push("/register");}
    const login = () => {history.push("/login");}
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        dispatch({type: actionType.REMOVE_WHOLE_CART_DATA});
        dispatch({type: actionType.AUTHENTICATE, payload: false});
        localStorage.setItem("auth-token", "");
        history.push("/shop");
    }

    return (
        <nav className="auth-options">
        {
            userData.user ?
            <button onClick={logout}>Log out</button> :
            <React.Fragment>
                <button onClick={register}>Register</button>
                <button onClick={login}>Login</button>
            </React.Fragment>
        }
            
        </nav>
    )
}

export default AuthOptions;