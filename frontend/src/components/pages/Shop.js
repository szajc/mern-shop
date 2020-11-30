import React from 'react'
// import Axios from 'axios';, { useState, useEffect }
// import { useSelector, useDispatch } from "react-redux";
//import * as actionType from '../../store/actions';

import Header from '../layout/Header';
//import ShopItems from '../layout/ShopItems';
import Footer from '../layout/Footer';
import ShopPages from '../layout/ShopPages';
import Recomended from '../layout/Recomended';
import Sliders from '../layout/Sliders';
import BigFooter from '../layout/BigFooter';
import News from '../layout/News';

import './styles/shop.css';

export default function Shop() {

    return (
        <React.Fragment>
            <Header  />
            <Sliders />
            <ShopPages />
            <Recomended title="We recomend" toWhere="recomended"/>
            <Recomended title="Dont miss out!" toWhere="blackfriday" />
            <News />
            <BigFooter />
            <Footer />
        </React.Fragment>
    )
}
