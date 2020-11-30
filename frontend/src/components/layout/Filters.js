import React, { useEffect, useState, useRef } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Slider, Checkbox, FormControlLabel } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import './styles/filters.css';

const ColorCheckbox = withStyles({
    root: {
      color: "#bd5d38",
      '&$checked': {
        color: "#bd5d38",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export default function Filters({ handleData, submitDataBack }) {
    
    // DISPATCH ALL VALUES TO REDUX -> 1 OBJECT ALL !!
    const [newPageData, setNewPageData] = useState();
    const [getParams, setGetParams] = useState({
        bike: false,
        Glasses: false,
        use: "",
        discount: false,
        new: false,
        search: "",
        value: [0, 2000]
    });

    const filterData = useRef(() => {});
    const getUrlData = useRef(() => {});
    
    getUrlData.current = () => {
        const queryString = window.location.search;
        let params = new URLSearchParams(queryString);
        console.log(queryString);
        console.log(params)
        params.forEach((value, key) => {
            console.log(key, value);
            setGetParams( prevState => {            
            return {...prevState,
                    [key]: value==="true" ? true : false
                }
        })
        });
        
    }
    useEffect(() => {
        getUrlData.current();
    }, [ handleData ])

    //dont need for inputs ...
    const valuetext = (value = getParams.value) => {
        return `${value}€`;
    }

    filterData.current = handleData && handleData.filter(each => (
        each.name.toLowerCase().indexOf(getParams.search.toLowerCase()) !== -1 || 
        each.category.toLowerCase().indexOf(getParams.search.toLowerCase()) !== -1

        ) &&
        ( 
            each.dprice ? 
            each.dprice > getParams.value[0] && each.dprice < getParams.value[1] :
            each.price > getParams.value[0] && each.price < getParams.value[1] 
            
        ) &&
        (
            getParams.discount ?
            each.offer!=="none" : 
            each.offer==="none" || each.offer!=="none"
        ) &&
        (
            getParams.new ? 
            each.use==="new" : 
            each.use==="new" || each.use==="old"
        )
    )
    useEffect(() => {
        setNewPageData(filterData.current);
    }, [ getParams ]) 

    useEffect(() => {
        submitDataBack(newPageData);
    }, [ newPageData ]) // watch out

    // BUTTONS BELLOW
    const handleClear = () => {
        setGetParams({
            bike: false,
            Glasses: false,
            use: "",
            discount: false,
            new: false,
            search: "",
            value: [0, 2000]
        })
    }

    const handleChangeCheckbox = (event) => {
        setGetParams(prevState => {
            return {
                ...prevState,
                new: event.target.checked,
            }
        })
    }
    const handleChangeCheckboxDiscount = (event) => {
        setGetParams(prevState => {
            return {
                ...prevState,
                discount: event.target.checked,
            }
        })
    }
    const handleChangeSlider = (event, newValue) => {
        setGetParams(prevState => {
            return {
                ...prevState,
                value: newValue,
            }
        })
    };
    const delPriceFilter = () => {
        setGetParams(prevState => {
            return {
                ...prevState,
                value: [0, 2000],
            }
        })
    }
    const delCheckFilter = () => {
        setGetParams(prevState => {
            return {
                ...prevState,
                new: false,
            }
        })
    }
    const delCheckFilterDisc = () => {
        setGetParams(prevState => {
            return {
                ...prevState,
                discount: false,
            }
        })
    }

    return (
        <div className="filters">
            <div className="filter-price">
                <div className="delete-filtered-price">
                    {
                        getParams.value[0]!==0 || getParams.value[1]!==2000 ? 
                        <div className="del-filter"
                            onClick={delPriceFilter}>
                            <span>X</span>Price set: {getParams.value[0]}€ - {getParams.value[1]}€</div> :
                        null
                    }
                    {
                        getParams.new ? 
                        <div className="del-filter"
                            onClick={delCheckFilter}>
                            <span>X</span>New items</div> :
                        null
                    }
                    {
                        getParams.discount ? 
                        <div className="del-filter"
                            onClick={delCheckFilterDisc}>
                            <span>X</span>Discount items</div> :
                        null
                    }
                </div>
                <button onClick={handleClear} >CLEAR FILTERS</button>
                <Typography id="range-slider" gutterBottom>Search</Typography>
                <input 
                    className="search-input"
                    placeholder="Search..."
                    name="search"
                    value={getParams.search}
                    onChange={ e => setGetParams(prevState => {
                        return {
                            ...prevState,
                            search: e.target.value,
                        }
                    })}  
                /> 
                <Typography id="range-slider" gutterBottom>Condition</Typography>
                <FormControlLabel control={<ColorCheckbox
                        checked={getParams.new}
                        name="new"
                        onChange={handleChangeCheckbox}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />} 
                    label="New" 
                />
                <FormControlLabel control={<ColorCheckbox
                        checked={getParams.discount}
                        name="discount"
                        onChange={handleChangeCheckboxDiscount}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />} 
                    label="Discount" 
                />
                <Typography id="range-slider" gutterBottom>Price</Typography>
                <Slider
                    value={getParams.value}
                    min={0}
                    max={2000}
                    name="value"
                    onChange={handleChangeSlider}
                    valueLabelDisplay="off"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
                <div className="filter-price-input">
                    <input  value={getParams.value[0]} 
                        onChange={e => setGetParams(prevState => {
                            return {
                                ...prevState,
                                value: [ +(e.target.value), prevState.value[1]],
                            }
                        })
                    } />
                    <p>-</p>
                    <input  value={getParams.value[1]} 
                        onChange={e => setGetParams(prevState => {
                            return {
                                ...prevState,
                                value: [ prevState.value[0], +(e.target.value)],
                            }
                        })
                    } />
                </div>
                    
            </div>
        </div>
    )
}
