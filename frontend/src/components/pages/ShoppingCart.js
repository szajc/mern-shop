import React from 'react'
import { useHistory } from "react-router-dom";

import Header from '../layout/Header';
import CartItems from '../layout/CartItems';
import CartPaying from '../layout/CartPaying';
import Footer from '../layout/Footer';

import './styles/shoppingCart.css'

import { useSelector } from "react-redux";

export default function ShoppingCart() {

    const history = useHistory();

    const cartItems = useSelector( (state) => state.cartData);

    const backToShop = () => {history.push("/shop");}

    return (
        <React.Fragment>
            <Header />
                <div className="shoppingCart">
                    {
                        Array.isArray(cartItems) && cartItems.length ? 
                        <React.Fragment>
                        <CartPaying /> 
                        <CartItems />
                            
                        </React.Fragment> :
                        <div className="empty-cart">
                            <div className="empty-cart-top">
                                <p>Your cart is currently empty.</p>
                            </div>
                            <button onClick={backToShop} >BACK TO SHOP</button>
                        </div>
                    }  
                </div>
           <Footer />
        </React.Fragment>
    )
}
