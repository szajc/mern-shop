import React from 'react'
import { useHistory } from 'react-router-dom';

import imgBike from '../images/bike1.jpg';
import imgGlas from '../images/gla1.jpg';
//import imgShoe from '../images/shoe1.jpg';

import './styles/shopPages.css';

export default function ShopPages() {

    const history = useHistory();

    // do dynamic CATEGORY from database
    // const id = "bike";
    // const id1 = "Glasses";

    return (
        <div className="shop-pages">
            <div className="shop-page" onClick={() => history.push(`/shop/allitems?new=true`)}>
                <div className="gray-overlay"></div>    
                <img src={imgBike} alt=""/>
                <p>Bikes</p>
            </div>
            <div className="shop-page" onClick={() => history.push(`/shop/allitems?$new=true`)}>
                <div className="gray-overlay"></div>
                <img src={imgGlas} alt=""/>
                <p>Glasses</p>
            </div>
        </div>
    )
}
