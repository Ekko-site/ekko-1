import React from 'react'
import moment from 'moment'

const style = {
    event: {
        borderColor: 'rgba(0,0,0,0.1)'
    }
}

export default ({ events }) => {
    if(!events.length){
        return <span></span>
    }
    return (
        <div className="events my4 center">
            <h2 className="mb2">Next events</h2>
            {events && events.map(event => {
                return <div style={style.event} className="event mb4 border-bottom pb4">
                    <div className="inline-block mx-auto">
                        <img src={event.cover.source} alt=""/>
                    </div>
                    <h3 className="my2">{event.name}</h3>
                    <div>
                        {(event.description) && (
                            <p className="mb2 left-align">{event.description}</p>
                        )}
                        <p className="left-align"><span className="bold">Place:</span> {event.place.name}</p>
                        <p className="left-align"><span className="bold">Date:</span> {moment(event.start_time).format('MMMM Do YYYY [at] h:mm:ss a')}</p>
                    </div>
                </div>
            })}
        </div>
    )
}
