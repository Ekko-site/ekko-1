import React from 'react'

export default ({ phone, style, className }) => {
    if(!phone){
        return <span></span>
    }
    return (
        <p className={`my2 white ${className}`} style={style}>Phone: {phone}</p>
    )
}
