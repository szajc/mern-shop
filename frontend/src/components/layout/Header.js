import React, { useState } from 'react'
import {Link} from "react-router-dom";
//import AuthOptions from "../auth/authOptions";
import Hamburger from './Hamburger';
import HamburgerFull from './HamburgerFull';
import hamburger from '../icons/hamburgerWhite.png'
import myaccount from '../icons/myaccount.png';

import './styles/header.css';

import cart from '../icons/shoppingcartwhite.png';
import upArrow from '../icons/upArrow.png';
import downArrow from '../icons/downArrow.png';

import { useSelector } from "react-redux";

export default function Header() {

    const [showHamburger, setShowHamburger] = useState(false);
    const [showHamburgerFull, setShowHamburgerFull] = useState(false);
    const cartCounter = useSelector( (state) => state.cart);

    const onHamburgerClick = () => {
        setShowHamburger(prevState => !prevState)
    }
    const onMyAccountClick = () => {
        setShowHamburgerFull(prevState => !prevState)
    }

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
                    <div className="hamburger-click" onClick={onHamburgerClick}>
                        <img src={hamburger} alt="" />
                    </div>
                    <div className="myaccount-click" onClick={onMyAccountClick}>
                        <img src={myaccount} alt="" />
                        <p>My account</p>
                        { 
                            showHamburgerFull ?
                            <img src={downArrow} alt="" /> :
                            <img src={upArrow} alt="" />
                        }
                    </div>
                    {
                        showHamburger ?
                        <Hamburger /> :
                        null
                    }
                    {
                        showHamburgerFull ?
                        <HamburgerFull /> :
                        null
                    }
                    {
                        //<AuthOptions />
                    }
                </div>
            </div>
        </div>
    )
}
