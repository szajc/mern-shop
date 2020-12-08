import React, { useState, useEffect, useRef } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';

import ShopItems from '../layout/ShopItems';
import './styles/recomended.css';
import { useSelector } from 'react-redux';

export default function Recomended({ toWhere, title }) {

    const [RecomendedData, setRecomendedData] = useState();
    const prod = useSelector( (state) => state.production);

    const getPageData = useRef(() => {});

    getPageData.current = async () => {
        try {
            await Axios.get( prod + "/shop/" + toWhere)
            .then(response => {
                setRecomendedData(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const toWhereHandler = () => {
        let goTo = "";
        if (toWhere === "blackfriday") {
            goTo = "offer/" + toWhere;
        } else if (toWhere==="recomended"){
            goTo = "allitems";
        }
        return goTo;
    }

    useEffect(() => {
        getPageData.current();
    }, [getPageData])

    return (
        <div className="recomended-items">
            <h3>{title}  <Link to={"/shop/" + toWhereHandler()} >{"Show more ->"}</Link></h3>
            <ShopItems data={RecomendedData} />
        </div>
    )
}
