
import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios';

import Header from '../layout/Header';
import Footer from '../layout/Footer';

import imgBike from '../images/bike1.jpg';
import imgGlas from '../images/gla1.jpg';
import imgShoe from '../images/shoe1.jpg';
import priceTag from '../icons/pricetag.png';

import * as actionType from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

import './styles/selectedItem.css';

export default function SelectedItem({match}) {

    const [data, setData] = useState();
    const [quantity, setQuantity] = useState(1);
    const cartData = useSelector( (state) => state.cartData);
    const prod = useSelector( (state) => state.production);

    const dispatch = useDispatch();

    const id = match.params.id

    const getData = useRef();

    getData.current = async () => {
        try {
            await Axios.get( prod + "/shop/" + id)
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData.current();
    }, [getData])

    const checkimg = (category) => {
        let cat;
        if (category === "bike") cat = imgBike
        if (category === "Glasses") cat = imgGlas
        if (category === "Shoes") cat = imgShoe
        return cat;
    }

    const addItemToCartMDB = async (selectedItem) => {
        try {
            console.log(selectedItem)
            let token = localStorage.getItem("auth-token");
            Axios.post( prod + "/cart/add", selectedItem, { headers: { "x-auth-token": token }})
            .then(response => {
                console.log(response.data);
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

    const addItem = () => {
        setQuantity(prevState => prevState + 1 );
    }
    const removeItem = () => {
        setQuantity(prevState => prevState - 1 );
    }
    const checkItem = (itemData) => {
        const checkElement = (element) => element.uid === itemData.uid;
        const checkSame = cartData.some(checkElement)
        if (checkSame) {
            //console.log("duplicate item")
            return true;
        } else { 
            //console.log("not duplicated")
            return false; }
    }
    const addQuantityToCart = () => {
        dispatch({
            type: actionType.ADD_QUANTITY_FROM_SELECTED_ITEM, 
            payload: {
                item: data,
                quantity: quantity
            }
        });
        let newData = {
            ...data,
            count: quantity
        }
        if (!checkItem(data)) {
            addItemToCartMDB(newData);
        } else {
            UpdateItemFromCartMDB(newData);
        }
        // resets quantity // add some info so customer knows it updated
        setQuantity(1);
    }

    return (
        <React.Fragment>
            <Header />
            <div className="selectedItem">
                <div className="item-container">
                    <img className="selected-item-img" src={data ? checkimg(data.category) : null} alt="" />
                    <div>
                        <p>{data ? data.name : null }</p>
                        <p>This item is the best</p>
                    </div>
                    <div className="pricetag-add-cart">
                        <div className="price-top">
                            <img className="pricetag-img" src={priceTag} alt="price tag" />
                            {   
                                data ?
                                data.dprice!==data.price ?
                                <div className="selected-item-prices">
                                    <p className="selected-item-price">{data.price}$</p>
                                    <p className="selected-item-dprice">{data.dprice}$</p>
                                </div> :
                                <p>{data.price}$</p> :
                                null
                            }
                        </div>
                        <div className="cartitems-buttons">
                            <div className="remove-cartitem" onClick={removeItem} >-</div>
                            <p>{ quantity }</p>
                            <div className="add-cartitem" onClick={addItem} >+</div>
                        </div>
                        <button className="card-button-item" 
                                    onClick={addQuantityToCart} >ADD TO CART</button>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}
