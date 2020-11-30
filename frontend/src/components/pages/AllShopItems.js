import React, { useState, useEffect, useRef, useCallback } from 'react'
import Axios from 'axios'
import { useDispatch } from "react-redux";
import * as actionType from '../../store/actions';

import Header from '../layout/Header';
import Comercial from '../layout/Comercial';
import ShopItems from '../layout/ShopItems';
import Footer from '../layout/Footer';
import Filters from '../layout/Filters';

import './styles/category.css'

export default function AllShopItems() {

    const [pageData, setPageData] = useState();
    const [newPageData, setNewPageData] = useState();
    const [openFilter, setOpenFilter] = useState(false);

    const dispatch = useDispatch();
    const getPageData = useRef(() => {});

    getPageData.current = async () => {
        try {
            await Axios.get( "http://localhost:5000/shop/all")
            .then(response => {
                setPageData(response.data);
                setNewPageData(response.data);
                dispatch({type: actionType.DATA_PASSING, payload: response.data})
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPageData.current();
    }, [getPageData]);

    const backData = (data) => {
        setNewPageData(data);
    }

    const openFilterHandler = () => {
        setOpenFilter(prevState => !prevState);
    }    
    return (
        <React.Fragment>
            <Header  /> 
            <Comercial />
            <div className="selected-page">
                <div className="open-filter" >
                    <button className="filter-button" onClick={openFilterHandler}>
                        Filter
                        <img  alt="" />
                    </button>
                    {
                        openFilter ?
                        <Filters  handleData={pageData} submitDataBack={backData} /> :
                        null
                    }
                </div>
                
                <ShopItems data={newPageData} />
                
            </div>
            <Footer />
        </React.Fragment>
    )
}
