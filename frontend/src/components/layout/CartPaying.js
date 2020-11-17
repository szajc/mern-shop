import React, { useContext, useState }from 'react'
import Axios from 'axios';
import './styles/cartPaying.css'

import ModalNotLogged from '../childComponents/ModalNotLogged';
import ModalLogged from '../childComponents/ModalLogged';
import ModalLoading from '../childComponents/ModalLoading';
import ModalPaymentSuccessfull from '../childComponents/ModalFinal';
import UserContext from "../../context/UserContext";

import * as actionType from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";

export default function CartPaying() {

    const [showModal, setShowModal] = useState(false);
    const [showModalLogged, setShowModalLogged] = useState(false);
    const [showFinalModal, setShowFinalModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const { userData } = useContext(UserContext);
    const price = useSelector( (state) => state.price);
    const count = useSelector( (state) => state.cart);
    const dispatch = useDispatch();

    const handlePayWithCard = () => {
        if (!userData.user) {
            setShowModal(true);
        } else {
            setShowModalLogged(true);
            console.log("u are logged")
        }
    }
    const deleteAllFromCartMDB = async () => {
        try {
            let token = localStorage.getItem("auth-token");
            await Axios.delete( "http://localhost:5000/cart/deleteall", { headers: { "x-auth-token": token }})
             .then(response => {
                 console.log(response.data);
             })  
        } catch (error) {
            console.log(error)
        }
    }
    const handlePayLoader = () => {
        setShowModalLogged(false);
        setLoading(true);
    }
    const showPaymentSuccessfullModal = () => {
        setShowFinalModal(true);
        // delete all items from mongodb and redux!!
        deleteAllFromCartMDB();
        dispatch({ type: actionType.DELETE_ALL_FROM_CART });
    }

    return (
        <div className="cartPaying">
            <p>Order summary</p>
            <div className="cartOrder">
                <div className="cartOrder-names">
                    <p>Total items:</p>
                    <p>Total price:</p>
                </div>
                <div className="cartOrder-prices">
                    <p>{count}</p>
                    <p>{price}$</p>
                </div>
            </div>
            <button className="cart-button" onClick={handlePayWithCard} >PAY WITH CARD</button>
            <ModalNotLogged open={showModal} close={() => setShowModal(false)} />
            <ModalLogged open={showModalLogged} close={() => setShowModalLogged(false)} pay={() => handlePayLoader()} />
            <ModalLoading open={loading} close={() => {
                setLoading(false);
                setShowFinalModal(true);
            }} />
            <ModalPaymentSuccessfull open={showFinalModal} close={() => showPaymentSuccessfullModal()} />
        </div>
    )
}
