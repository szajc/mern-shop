import React from 'react'

export default function ErrorNotice({message, clearNotice}) {
    return (
        <div className="error-notice">
            <span>{message}</span>
            <button onClick={clearNotice}>X</button>
        </div>
    )
}
