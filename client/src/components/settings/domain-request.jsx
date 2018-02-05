import React from 'react'

const DomainRequests = ({ dnsRequested, domainRequest, domainId }) => {
    let registrarInput
    if(dnsRequested){
        return <p className="mini faded">Your domain name is in the process of switching to Ekko...we'll be in touch shortly!</p>
    }
    return <div className="dash-domain">
        <p className="half-mb">Switch your domain to your Ekko site</p>
        <form className="form" onSubmit={event => {
            event.preventDefault()
            domainRequest(registrarInput.value, domainId)
        }}>
            <label className="mini faded" for="registrar-input">If you know who you registered the domain with, enter it here. If you don't, that's not a problem!</label>
            <input ref={c => (registrarInput = c)} type="text" className="mini" id="registrar-input" />
            <button className="butt">Submit</button>
        </form>
    </div>
}

export default DomainRequests
