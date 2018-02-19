import React from 'react'

import Name from './../../components/name'
import ProfilePicture from './../../components/profile-picture'
import Phone from './../../components/phone'
import Cta from './../../components/cta'

export default ({ cover, picture = {}, name, phone, callToActions }) => {

    const styles = {
        header: {
            overflow: 'hidden'
        },
        name: {
            borderWidth: '5px'
        },
        phone: {
            borderWidth: '5px'
        },
        blur: {
            position: 'absolute',
            top: '-10px',
            left: '-10px',
            bottom: '-10px',
            right: '-10px',
            backgroundSize: 'cover',
	        backgroundRepeat: 'no-repeat',
	        backgroundPosition: 'center center',
	        backgroundColor: '#1c1c1c',
            WebkitFilter: 'blur(4px)',
            backgroundImage: cover ? `linear-gradient(
                                  rgba(0,0,0,0.4),
                                  rgba(0,0,0,0.1)
                              ),
                              url(${cover.source})` : 'none',
            zIndex: '-1'
        }
    }

    let tel = phone && !phone.match(/<<not-applicable>>/i) ? phone : null

    return (
        <header style={styles.header} className="px2 py4 center mb4 relative border">
            <div style={styles.blur}></div>
            <div className="flex flex-column items-center mx-auto max-width-4">
                <Name name={name} style={styles.name} className="py1 px2 border bg-black inline-block mx-auto mb4" />
                <ProfilePicture picture={picture.url} />
                {tel && (
                    <Phone phone={tel} style={styles.phone} className="py1 px2 border bg-black bold white" />
                )}
            </div>
            {/*<Cta ctas={callToActions} />*/}
        </header>
    )
}
