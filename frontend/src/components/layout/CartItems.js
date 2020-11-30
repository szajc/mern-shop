import React, { useContext } from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import UserContext from '../../context/UserContext';
import Axios from 'axios';

import imgBike from '../images/bike1.jpg';
import imgGlas from '../images/gla1.jpg';
import imgShoe from '../images/shoe1.jpg';

import trash from '../icons/trashorange.png';

import './styles/cartItems.css';

import * as actionType from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

export default function CartItems() {

    const cartItems = useSelector( (state) => state.cartData);
    const { userData } = useContext(UserContext);
    console.log(cartItems);
    const dispatch = useDispatch();
    
    const checkimg = (category) => {
        let cat;
        if (category === "bike") cat = imgBike
        if (category === "Glasses") cat = imgGlas
        if (category === "Shoes") cat = imgShoe
        return cat;
    }
    const colorClass = (color) => {
        let colors;
        if (color === "new") colors = "rotated-square green";
        if (color === "old") colors = "rotated-square red";
        return colors;
    }
    const updateItemFromCartMDB = async (selectedItem) => {
        try {
            let token = localStorage.getItem("auth-token");
            Axios.post( "http://localhost:5000/cart/updatecart", selectedItem, { headers: { "x-auth-token": token }})
            .then(response => {
                console.log(response.data);
            })  
        } catch (error) {
            console.log(error)
        }
    }

    const addItemToCart = async (selectedItem) => {
        const newItem = {
            item: selectedItem,
            quantity: 1,
        }
        console.log(selectedItem)
        dispatch({type: actionType.ADD_SAME_CART_ITEM, payload: selectedItem.uid});
        dispatch({type: actionType.ADD_CART});
        dispatch({type: actionType.ADD_PRICE, payload: selectedItem.dprice ? selectedItem.dprice : selectedItem.price});
        await updateItemFromCartMDB(newItem)
    }
    const removeItemFromCart = async (selectedItem) => {
        const newItem = {
            item: selectedItem,
            quantity: -1,
        }
        if (selectedItem.count > 1) {
            dispatch({type: actionType.REMOVE_SAME_CART_ITEM, payload: selectedItem.uid});
            dispatch({type: actionType.REMOVE_CART});
            dispatch({type: actionType.REMOVE_PRICE, payload: selectedItem.dprice ? selectedItem.dprice : selectedItem.price});
            await updateItemFromCartMDB(newItem)
        }
    }

    const removeWholeItemFromCart = async (removedItem) => {
        console.log("item removed: " + removedItem.name);
        dispatch({type: actionType.REMOVE_WHOLE_ITEM_FROM_CART, payload: removedItem});
        try {
            if (userData) {
                let token = localStorage.getItem("auth-token");
                Axios.delete( "http://localhost:5000/cart/"+removedItem._id, { headers: { "x-auth-token": token }})
                .then(response => {
                    console.log(response);
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <div className="cart-items">
            {
                Array.isArray(cartItems) && cartItems.length ? 
                cartItems.map( (item) => (
                    <div className="cart-cards" key={item._id}>
                        <div className="card-div">
                            <Card style={{ width: '130px' }} >
                                <Link to={"/shop/" + item.uid} >
                                    <Card.Img variant="top" src={checkimg(item.category)} alt="image" />
                                </Link>
                                {
                                    item.use==="new" ?
                                    <div className="square">
                                        <div className={colorClass(item.use)}  >
                                            <p>{item.use}</p>
                                        </div>
                                    </div> :
                                    null
                                }
                                <Card.Body className="cart-card-body">
                                    {
                                        item.dprice!==item.price ?
                                        <div className="item-prices">
                                            <p className="item-price">{item.price}$</p>
                                            <p className="item-dprice">{item.dprice}$</p>
                                        </div> :
                                        <p>{item.price}$</p>
                                    }
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="cart-right-items">
                            <div className="cart-itemname">
                                <p>{item.name}</p>
                            </div>
                            <div className="cartitems-buttons">
                                <div className="remove-cartitem" onClick={() => removeItemFromCart(item)} >-</div>
                                <p>{item.count}</p>
                                <div className="add-cartitem" onClick={() => addItemToCart(item)} >+</div>
                            </div>
                            <div className="buttons-divider" onClick={() => removeWholeItemFromCart(item)}>
                                <img className="cart-trash-img" src={trash} alt="trash icon"/>
                            </div>
                        </div>
                    </div>
                )) :
                null
            }
            </div>
    )
}
