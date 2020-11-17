import React from 'react'
import Add from '../images/shoppingComercial1.jpg'

import './styles/comercial.css';

export default function Comercial() {
    return (
        <div className="commercial">
            <div className="gray-overlay">
                <p>Enjoy online Shopping</p>
            </div>
            <img className="addimg" src={Add} alt="shopping" />
        </div>
    )
}
