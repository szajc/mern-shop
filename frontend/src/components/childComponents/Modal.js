import React from 'react';
import './styles/Modal.css';

export default function Modal({ modalContent, dispatch }) {

    const closeModal = () => {
        setTimeout(() => {
            dispatch({ type: 'CLOSE_MODAL' })
        }, 3000);
    }
    closeModal();

    let bColor;
    modalContent === "Item added" ? bColor = "lightgreen" : bColor = "rgb(250, 137, 137)";

    return (
        <div className="modalBody" > 
            <span style={{ backgroundColor: bColor }}>
                <p>{modalContent}</p>
            </span>
        </div>
    )
}
