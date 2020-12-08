import React from 'react'
import { Card } from 'react-bootstrap';
import Axios from 'axios';

import imgBike from '../images/bike1.jpg';
import imgGlas from '../images/gla1.jpg';
import imgShoe from '../images/shoe1.jpg';

import * as actionType from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

import { Link } from 'react-router-dom'

import './styles/shopItemsgrid.css'

export default function ShopItems({ data }) {

    const cartData = useSelector( (state) => state.cartData);
    const prod = useSelector( (state) => state.production);
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
    const checkItem = (itemData) => {
        // checking for item.ID from CART wich has new _ID and _ID from SHOP
        if (cartData.some(item => item.uid === itemData.uid) ) {
            console.log("duplicate item")
            return true;
        } else { return false; }
    }

    const addItemToCartMDB = async (selectedItem) => {
        try {
            console.log(selectedItem)
            let token = localStorage.getItem("auth-token");
            Axios.post( prod + "/cart/add", selectedItem, { headers: { "x-auth-token": token }})
            .then(response => {
                console.log(response.data);
                dispatch({ type: actionType.ADD_DATA, payload: response.data });
            })  
        } catch (error) {
            console.log(error)
        }
    }
    const UpdateItemFromCartMDB = async (selectedItem) => {
        try {
            let getSameItem = cartData.filter(item => item.uid === selectedItem.uid)
            let newObj = {
                item: selectedItem,
                quantity: getSameItem[0].count,
            }
            console.log(getSameItem)
            console.log(newObj)
            let token = localStorage.getItem("auth-token");
            Axios.post( prod + "/cart/updatecart", newObj, { headers: { "x-auth-token": token }})
            .then(response => {
                console.log(response.data);
            })  
        } catch (error) {
            console.log(error)
        }
    }

    const addToCart = async (selectedItem) => {
        //console.log(checkItem(selectedItem))
        console.log(selectedItem)
        dispatch({type: actionType.ADD_CART});
        dispatch({type: actionType.ADD_PRICE, payload: selectedItem.dprice ? selectedItem.dprice : selectedItem.price});
        if (checkItem(selectedItem)) {
            dispatch({type: actionType.ADD_SAME_CART_ITEM, payload: selectedItem.uid});
            await UpdateItemFromCartMDB(selectedItem);
        } else {
            await addItemToCartMDB(selectedItem);
        }
    }

    return (
        <div className="shop-items" >
            {
                data ? data.map( item => (
                    <Card key={item._id} >
                        <Link to={"/shop/" + item.uid} >
                            <Card.Img variant="top" src={checkimg(item.category)} alt="" />
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
                        {
                            item.dprice!==item.price ?
                            <div className="discount">
                                <p>-{Math.round(100 - (item.dprice * 100 / item.price))}%</p>
                            </div> :
                            null
                        }
                        <Card.Body>
                            <Card.Subtitle>{item.name}</Card.Subtitle>
                            {
                                item.dprice!==item.price ?
                                <div className="item-prices">
                                    <p className="item-price">{item.price}$</p>
                                    <p className="item-dprice">{item.dprice}$</p>
                                </div> :
                                <p>{item.price}$</p>
                            }
                            <div className="buttons-divider">
                                <button className="card-button" 
                                    onClick={() => addToCart(item)} >Add to cart</button>
                            </div>
                            <p>In Stock</p>
                        </Card.Body>
                    </Card>
                )) : null
            }
        </div>
    )
}
