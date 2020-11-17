import React, { useState } from 'react';
import ReactDom from 'react-dom';
import DotLoader from "react-spinners/DotLoader";
import './styles/modalLoading.css'

export default function ModalLoading({ open, close }) {

    const [text, setText] = useState("Connecting...")

    if (!open) return null;

    setTimeout(() => setText("verifying.."), 1000);
       
    setTimeout(() => setText("Paying..."), 2000);
        
    setTimeout(() => {
        close();
    }, 3000);    
    
    return ReactDom.createPortal(
        <React.Fragment>
            <div className="ModalLoad" />
            <div className="OverlayLoad">
                <div className="dotLoader">
                    <DotLoader
                        size={50}
                        color={"#bd5d38"}
                        loading={open}/> 
                </div>
                <p>{text}</p>
            </div>
        </React.Fragment>,
        document.getElementById("portal")
    )
}
