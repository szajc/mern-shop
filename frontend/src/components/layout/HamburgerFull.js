import React, { useContext } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import './styles/hamburger-full.css'
import { useDispatch } from "react-redux";
import * as actionType from '../../store/actions';

const HamburgerFull = () => {
    const {userData, setUserData} = useContext(UserContext);
    
    const history = useHistory();
    const dispatch = useDispatch()

    const register = () => {history.push("/register");}
    const login = () => {history.push("/login");}
    const goToSettings = () => {history.push("/settings")};
    const goToShop = () => {history.push("/shop/allitems")};
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
        <div className="hamburger-full">
            <button onClick={goToShop}>Shop</button>
            <button onClick={goToSettings}>Settings</button>
            <div className="hamburger-auth-full">
            {
                userData.user ?
                <button onClick={logout}>Log out</button> :
                <div className="ham-logreg-full">
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </div>
            }
            </div>
        </div>
    )
}

export default HamburgerFull;