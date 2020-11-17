import React, { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import {useHistory} from "react-router-dom";
import UserContext from '../../context/UserContext';
import valid from 'card-validator';
import { Form } from 'react-bootstrap';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';

import './styles/modalLogged.css';

export default function ModalLogged({open, close, pay}) {

    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [cvc, setCvc] = useState("");
    const [expiry, setExpiry] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [focus, setFocus] = useState("");

    const history = useHistory();
    const { userData } = useContext(UserContext);

    if (!open) return null;
    if (!userData) return history.push("/login");

    const test = (e) => {
        e.preventDefault();
        console.log(number)
        console.log(name)
        console.log(cvc)
        
        let numberValidation = valid.number(number);
           
        if (cvc.length !== 3) {setErrorMsg("CVC not valid")}
        else if (!numberValidation.isValid) {setErrorMsg("CC number not valid")}
        //else if (!year || !month) {setErrorMsg("date/month not selected")}
        //else if (year > +year+20) {setErrorMsg("expiary date wrong")}
        else {
            pay();
            setErrorMsg("all ok")
        }

        //save to DB 
        // do checking 
        // all ok ...

    }
    
    

    return ReactDom.createPortal(
        <React.Fragment>
            <div className="Modal" />
            <div className="Overlay">
                <Form className="form-wrap" onSubmit={ e => test(e) }>
                    <div className="card-select">
                        <Cards 
                            cvc={cvc}
                            expiry={expiry}
                            focused={focus}
                            name={name}
                            number={number}
                        />
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <div className="card-number">
                            <Form.Label>Card number</Form.Label>
                            <Form.Control
                                name="number"
                                autoComplete="off"
                                type="tel"
                                value={number}
                                placeholder="Enter card number" 
                                onChange={e => setNumber(e.target.value)} 
                                onFocus={e => setFocus(e.target.name)} />
                        </div>
                        <div className="card-owner">
                            <Form.Label>Owner</Form.Label>
                            <Form.Control
                                autoComplete="off"
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                onFocus={e => setFocus(e.target.name)} />
                        </div>
                        <div className="card-first-line">
                            <div className="card-exp">
                                <Form.Label>Expiration date</Form.Label>
                                <Form.Control
                                    autoComplete="off"
                                    type="text"
                                    placeholder="MM/YY"
                                    name="expiry"
                                    value={expiry}
                                    onChange={e => setExpiry(e.target.value)} 
                                    onFocus={e => setFocus(e.target.name)} />
                            </div>    
                            <div className="card-cvv">
                                <Form.Label>Cvc</Form.Label>
                                <Form.Control
                                    autoComplete="off"
                                    type="tel"
                                    name="cvc"
                                    value={cvc}
                                    placeholder="Name"
                                    onChange={e => setCvc(e.target.value)} 
                                    onFocus={e => setFocus(e.target.name)} />
                            </div>
                        </div>
                    </Form.Group>
                    <div className="pay-buttons">
                        <button className="cart-pay-buttons" onClick={close} >CANCLE</button>
                        <button
                            className="login-button"
                            variant="primary" 
                            type="submit"
                            >PAY
                        </button>
                    </div>
                </Form>
                <div>
                    <p>{errorMsg}</p>
                </div>
            </div>
        </React.Fragment>,
        document.getElementById("portal")
    )
}
