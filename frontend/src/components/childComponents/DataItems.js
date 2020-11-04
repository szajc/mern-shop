import React from 'react'
import { Button } from 'react-bootstrap';

export default function DataItems({data, onDeleteHandler}) {
    return (
        <React.Fragment>
            { data.map(item => (
                <div className="todo-item" 
                    key={item._id}>
                    <p>{item.title}</p>
                    <Button onClick={() => onDeleteHandler(item._id)} >delete</Button>
                </div>
            )) }
        </React.Fragment>
    )
}
