import React, { useState } from 'react'
import Axios from 'axios';
import './styles/news.css';
import email from '../icons/emailwhite.png';
import { useSelector } from 'react-redux';

export default function News() {

    const [newsEmail, setNewsEmail] = useState("");
    const prod = useSelector( (state) => state.production);

    const postData = async (newEmail) => {
        try {
            const newObj = {
                email: newEmail
            }
            let token = localStorage.getItem("auth-token");
            await Axios.post( prod + "/news/add", newObj, { headers: { "x-auth-token": token }})
            .then(response => {
                console.log(response.data);
            }) 
        } catch (error) {
            console.log(error);
        }
    }

    const newsSubscribe = async (e) => {
        e.preventDefault();
        console.log(newsEmail);
        if (newsEmail !=="" ) {
            postData(newsEmail)
        } else {
            console.log("enter email")
        }
    }

    return (
        <div className="news">
            <img src={email} alt=""/>
            <p>Be first! Subscribe to e-news and be the first to get the newest discount offers.</p>
            <form onSubmit={e => newsSubscribe(e)} >
                <input 
                    type="text" 
                    placeholder="Enter your email addres..."
                    //value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)} 
                />
                <button type="submit" >Send</button>
            </form>
        </div>
    )
}
