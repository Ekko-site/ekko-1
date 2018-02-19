import React from 'react'

const API_KEY = 'AIzaSyCPuOwTgswye73SH5wa_5mlCgOYorCR3fY'

export default ({ location }) => {
    if(!location){
        return <span></span>
    }
    return (
        <div className="my2 flex justify-center">
            <div className="mr1">
                <p>{location.street}</p>
                <p>{location.city}</p>
                <p>{location.country}</p>
                <p>{location.zip}</p>
            </div>
            {
                (location.street) && (
                    <iframe
                        className="ml1" src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${location.street || ''}, ${location.city}, ${location.zip}`} frameBorder="0"></iframe>
                )
            }
        </div>
    )
}
