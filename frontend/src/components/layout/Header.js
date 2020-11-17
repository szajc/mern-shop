import React from 'react'
import {Link} from "react-router-dom";
import AuthOptions from "../auth/authOptions";

import './styles/header.css';

import cart from '../icons/shoppingcart.png'
import { useSelector } from "react-redux";

export default function Header() {

    const cartCounter = useSelector( (state) => state.cart);

    return (
        <div id="header">
            <div className="in-header">
                <Link to="/shop">
                    <h2 className="title">Bazar</h2>
                </Link>
                <div className="rightHeader">
                    <div className="cart">
                        <Link to="/cart">
                            <img src={cart} alt="cart" />
                            <div className="circle-items">{cartCounter}</div>
                        </Link>
                    </div>
                    <AuthOptions />
                </div>
            </div>
        </div>
    )
}
