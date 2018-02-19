import React from 'react'
import moment from 'moment'
import Linkify from 'react-linkify'

const style = {
    post: {
        borderColor: 'rgba(0,0,0,0.1)'
    },
    timestamp: {
        color: '#777',
        marginBottom: '0.25rem'
    }
}

export default({posts}) => {
    if (!posts.length) {
        return <span></span>
    }
    return (
        <div className="posts max-width-2 mx-auto mt4">
            <h2 className="mb2 center">Latest posts</h2>
            {posts.map((post, index) => {
                return <div
                        style={style.post}
                        className={`post mb4 pb4 ${posts.length - 1 !== index
                    ? 'border-bottom'
                    : ''}`}>
                    <p style={style.timestamp} className="italic h6">{moment(post.created_time).fromNow()}</p>
                    <Linkify>
                        <p className="mb2">{post.message}</p>
                    </Linkify>
                    <img src={post.full_picture} alt=""/>
                </div>
            })}
        </div>
    )
}
