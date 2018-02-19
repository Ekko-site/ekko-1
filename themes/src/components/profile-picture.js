import React from 'react'

const style = {
    img: {
        borderWidth: '5px',
        borderColor: '#fff'
    }
}

export default ({ picture }) => {
    return (
        <div className="inline-block">
            <img style={style.img} className="border" src={ picture }/>
        </div>
    )
}
