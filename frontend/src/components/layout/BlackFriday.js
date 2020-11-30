import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';

import ShopItems from '../layout/ShopItems';

export default function BlackFriday() {

    const [bfData, setBfData] = useState();

    const getPageData = async () => {
        try {
            await Axios.get( "http://localhost:5000/shop/blackfriday" )
            .then(response => {
                setBfData(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPageData();
    }, [])

    return (
        <div className="recomended-items">
            <h3>Dont miss out!  <Link to="/shop/offer/blackfriday">{"Show more ->"}</Link></h3>
            <ShopItems data={bfData} />
        </div>
    )
}
