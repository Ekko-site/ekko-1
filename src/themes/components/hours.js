import React from 'react'

export default ({ hours }) => {
    if(!hours){
        return <span></span>
    }
    return (
        <div className="my2 ml2 hours">
            <ul className="list-reset">
                <li>Monday <span className="bold right pl2">{hours.mon_1_open} - {hours.mon_1_close}</span></li>
                <li>Tuesday <span className="bold right pl2">{hours.tue_1_open} - {hours.tue_1_close}</span></li>
                <li>Wednesday <span className="bold right pl2">{hours.wed_1_open} - {hours.wed_1_close}</span></li>
                <li>Thursday <span className="bold right pl2">{hours.thu_1_open} - {hours.thu_1_close}</span></li>
                <li>Friday <span className="bold right pl2">{hours.fri_1_open} - {hours.fri_1_close}</span></li>
                <li>Saturday <span className="bold right pl2">{hours.sat_1_open} - {hours.sat_1_close}</span></li>
                <li>Sunday <span className="bold right pl2">{hours.sun_1_open} - {hours.sun_1_close}</span></li>
            </ul>
        </div>
    )
}
