import React, { useState, useEffect } from 'react'
import Axios from 'axios';

import Header from '../layout/Header';
import Comercial from '../layout/Comercial';
import ShopItems from '../layout/ShopItems';
import Footer from '../layout/Footer';

import searchIcon from '../icons/searchicon.png';
import './styles/shop.css';

export default function Shop() {

    const [data, setData] = useState()
    const [dataPassing, setDataPassing] = useState()

    const getData = async () => {
        try {
            await Axios.get( "http://localhost:5000/shop/all")
            .then(response => {
                setData(response.data);
                console.log(response.data)
                setDataPassing(response.data);
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const showAll = () => {
        setDataPassing(data);
    }
    const showBikeOnly = () => {
        let newDataForPassing = data.filter(each => each.category === "bike")
        setDataPassing(newDataForPassing);
    }
    const showGlassesOnly = () => {
        let newDataForPassing = data.filter(each => each.category === "Glasses")
        setDataPassing(newDataForPassing);
    }
    const getSearch = (e) => {
        let search = e.target.value
        let newDataForPassing = data.filter( each => 
            each.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 || 
            each.category.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
        setDataPassing(newDataForPassing);
    }
    return (
        <React.Fragment>
            <Header  />    
            <Comercial />
            <div className="shop-choose" >
                <div className="in-shop-choose">
                    <div className="shop-buttons">
                        <button onClick={showAll} >ALL</button>
                        <button onClick={showBikeOnly} >BIKE</button>
                        <button onClick={showGlassesOnly} >GLASSES</button>
                    </div>
                    <div className="search">
                        <img src={searchIcon} alt="search" />
                        <input
                            className="search-input"
                            type="text"
                            placeholder="Search..."
                            onChange={getSearch} />
                    </div>
                </div>
            </div>
            <ShopItems data={dataPassing} />
            <Footer />
        </React.Fragment>
    )
}
