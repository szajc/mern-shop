import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios'

import Header from '../layout/Header';
import Comercial from '../layout/Comercial';
import ShopItems from '../layout/ShopItems';
import Footer from '../layout/Footer';
import Filters from '../layout/Filters';

import './styles/category.css'

export default function Categor() {

    const [pageData, setPageData] = useState();
    const [newPageData, setNewPageData] = useState();

    const getPageData = useRef(() => {});

    //get the :ID/slug from URL so it can be used to fetch data from DB via express :ID
    const { id } = useParams();

    getPageData.current = async () => {
        try {
            await Axios.get( "http://localhost:5000/shop/offer/" + id)
            .then(response => {
                setPageData(response.data);
                setNewPageData(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPageData.current();
    }, [getPageData])

    const backData = (data) => {
        setNewPageData(data);
    }

    return (
        <React.Fragment>
            <Header  /> 
            <Comercial />
            <div className="selected-page">
                <Filters handleData={pageData} submitDataBack={backData} />
                <ShopItems data={newPageData} />
            </div>
            <Footer />
        </React.Fragment>
    )
}
