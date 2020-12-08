import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ShopItems from '../layout/ShopItems';

export default function BlackFriday() {

    const [bfData, setBfData] = useState();
    const prod = useSelector( (state) => state.production);

    const getPageData = async () => {
        try {
            await Axios.get( prod + "/shop/blackfriday" )
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
