import React from 'react'
import ReactDom from 'react-dom'
import {useHistory} from "react-router-dom";

import './styles/modalNotLogged.css';

export default function ModalNotLogged({open, close}) {

    const history = useHistory();

    const pushLogin = () => {
        history.push("/login")
    }

    if (!open) return null;
    return ReactDom.createPortal(
        <React.Fragment>
            <div className="Modal" />
            <div className="Overlay">
                <p>U need to be logged in to continue!</p>
                <button className="cart-pay-buttons" onClick={pushLogin}>LOG IN</button>
                <button className="cart-pay-buttons" onClick={close} >CANCLE</button>
            </div>
        </React.Fragment>,
        document.getElementById("portal")
    )
}
