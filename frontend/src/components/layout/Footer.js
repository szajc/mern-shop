import React from 'react'

import './styles/footer.css'

export default function Footer() {

    let d = new Date();
    let n = d.getFullYear();

    return (
        <div id="footer">
            <div className="in-footer">
                <p>Copyright SZajc, {n}</p>
            </div>
        </div>
    )
}
