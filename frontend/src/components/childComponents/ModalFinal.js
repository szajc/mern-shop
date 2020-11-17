import React from 'react';
import ReactDom from 'react-dom';

export default function ModalFinal({ open, close }) {

    if (!open) return null;
    
    return ReactDom.createPortal(
        <React.Fragment>
            <div className="ModalLoad" />
            <div className="OverlayLoad">
                <p>Payment Successfull</p>
                <button
                    className="login-button"
                    variant="primary"
                    onClick={close}
                    >CLOSE
                </button>
            </div>
        </React.Fragment>,
        document.getElementById("portal")
    )
}
