import React from 'react'

export default ({ photos }) => {
    if(!photos.length){
        return <span></span>
    }
    return (
        <div className="photo-grid flex flex-wrap">
            {photos && photos.map(photo => {
                let image = photo.images.length
                    ? photo.images[0]
                    : null
                if (!image) {
                    return null
                }
                return <img src={image.source}/>
            })}
        </div>
    )
}
