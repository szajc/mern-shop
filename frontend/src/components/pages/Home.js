import React, { useState, useEffect, useContext, useRef, useReducer } from 'react'
import Axios from 'axios';
import {useHistory} from "react-router-dom";
import UserContext from "../../context/UserContext";
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import DataItems from '../childComponents/DataItems';
import Modal from '../childComponents/Modal';
import { reducer } from '../reducers/homeReducer';
import './Home.css';

const defaultState = {
    data: [],
    isModalOpen: false,
    modalContent: "",
}

export default function Home() {

    //const [data, setData] = useState()
    const [state, dispatch] = useReducer(reducer, defaultState);
    const [title, setTitle] = useState();

    const { userData } = useContext(UserContext);
    const history = useHistory();

        // *
    // best way to check for mounted component !!
    const isCurrent = useRef(true);

    useEffect(() => {
        return () => {
        isCurrent.current = false;
        }
    }, [])
    // * for checking mounted components
    // *
    // then use 
    // if (isCurrent.current) { setState(XXYY) }  !!

    useEffect(() => {
        if (!userData.user) history.push("/login");
    });

    // getting data from DB
    const getData = async () => {
        try {
            const token = localStorage.getItem("auth-token");
            await Axios.get( "http://localhost:5000/todos/all", { headers: { "x-auth-token": token }})
            .then(response => {
                //if (isCurrent.current) { setData(response.data) }
                dispatch({type: 'SETDATA', payload: response.data})
                //setData(response.data);
                console.log(response.data)
            })
        } catch (error) {
            console.log(error);
        }
    }
    // adding TODO
    const addTodo = () => {
        
        try {
            // adding todo to mongoDB
            if ( title === "" || title === null || title === undefined ) {
                return dispatch({ type: 'NO_VALUE' });
            }
            const newTodo = { 
                title: title 
            }
            const token = localStorage.getItem("auth-token");
            Axios.post( "http://localhost:5000/todos/", newTodo, { headers: { "x-auth-token": token }})
                .then(response => {
                    console.log(response);
                    //dispatch
                    dispatch({type: 'ADDITEM', payload: response.data})
                    if (isCurrent.current) { setTitle("") };
                })
        } catch (error) {
            console.log(error);
        }   
    }
    
    useEffect(() => {
        getData();
        console.log(userData);
        console.log("useeffect only once?")
    }, [])

    const onDeleteHandler = (deleteId) => {
        try {
            // delete in array we got from mongoDB
            dispatch({type: 'DELETEITEM', payload: deleteId})
            //const newData = data.filter(item => item._id !== deleteId)
            //setData(newData); 

            // delete on server mongoDB
            const token = localStorage.getItem("auth-token");
            Axios.delete( "http://localhost:5000/todos/" + deleteId, { headers: { "x-auth-token": token }} )
            .then(res => {
                console.log(res)
            })
        } catch (error) {
            console.log(error)
        }
    }
    

    return (
        <div className="page">
            {userData.user ? (
                <React.Fragment>
                    <h1>Welcome {userData.user.displayName}</h1>

                    <div className="modal">
                    { 
                        state.isModalOpen ?
                        <Modal modalContent={state.modalContent} dispatch={dispatch} /> :
                        null 
                    }
                    </div>
                    <DataItems data={state.data} onDeleteHandler={onDeleteHandler} />
                    
                    <div className="addItemForm">
                        <input 
                            type="text"
                            value={title}
                            placeholder="Enter todo title"
                            onChange={(e) => setTitle(e.target.value)} />
                        <Button 
                            variant="primary" 
                            onClick={addTodo} >Add todo
                        </Button>  
                    </div>

                </React.Fragment>
            ) : (
                <React.Fragment>
                    <h2>You are not logged in</h2>
                    <Link to="/login">Log in</Link>
                </React.Fragment>
            )}
        </div>
    )
}
