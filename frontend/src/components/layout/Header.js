import React from 'react'
import {Link} from "react-router-dom";
import AuthOptions from "../auth/authOptions";

export default function Header() {
    return (
        <div id="header">
            <Link to="/">
                <h1 className="title">Mern auth todo app</h1>
            </Link>
            <AuthOptions />
        </div>
    )
}
