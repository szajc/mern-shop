import React from 'react';

import './styles/bigFooter.css';

export default function BigFooter() {
    return (
        <div className="bigFooter">
            <div className="column-bigFooter">
                <div className="first-row-footer">
                    <p><span>Bazar.com</span></p>
                    <p>home</p>
                    <p>Contacts</p>
                    <p>Discounts</p>
                </div>
                <div className="first-row-footer">
                    <p><span>Terms of business</span></p>
                    <p>Terms</p>
                    <p>delivery and payment</p>
                    <p>Methods of payment</p>
                </div>
            </div>
            <div className="column-bigFooter">
                <div className="first-row-footer">
                    <p><span>Methods of payment</span></p>
                    <p>- Credit card</p>
                    <p>- Crypto</p>
                    <p>- On delivery</p>
                </div>
                <div className="first-row-footer">
                    <p><span>Help and orders</span></p>
                    <h3>012345678</h3>
                    <a>info@bazar.com</a>
                    <p>Monday to friday: 9:00 - 20:00</p>
                </div>
            </div>
        </div>
    )
}
