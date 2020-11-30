import React from 'react'
import Slider from "react-slick";
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './styles/sliders.css';

import image1 from '../images/black-friday.jpg'
import image2 from '../images/bikes.jpg'
import image3 from '../images/glasses.jpg'

const settings = {
        dots: true,
        infinite: true,
        speed: 5,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

export default function Sliders() {
    
    

    return (
        <div className="slider-component">
            <Slider {...settings} >
                <div>
                    <Link to="/shop/allitems">
                        <img src={image1} alt=""/>
                    </Link>
                </div>
                <div>
                    <Link to="/shop/allitems">
                        <img src={image2} alt=""/>
                    </Link>
                </div>
                <div>
                    <Link to="/shop/allitems">
                        <img src={image3} alt=""/>
                    </Link>
                </div>
            </Slider>
        </div>
    )
}
