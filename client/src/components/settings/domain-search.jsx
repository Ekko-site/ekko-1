import React from 'react'

import Loading from '@/../loading.jsx'
import DomainContact from '@/domain-contact.jsx'
import FormattedDomainCost from '@/formatted-domain-cost.jsx'

const DomainSearch = ({ onSearch, domains, searching, onDomainSelection, pages, addingDomain, tlds, plans, userPlan }) => {
    let input,
        existingInput,
        registrarInput
    const page = pages.length ? pages[0] : null
    if(!page){
        return <span></span>
    }
    if(addingDomain){
        return <span>
            <Loading column>
                <p className="mini faded">Adding your domain now...sit tight.</p>
            </Loading>
        </span>
    }
    return (
        <div>
            <div className="dash-domain half-mb">
                <p className="half-mb">Need a domain for {page.data.name}?</p>
                <form className="form" onSubmit={event => {
                    event.preventDefault()
                    !searching && onSearch(input.value)
                }}>
                    <label className="mini faded" for="domain-input">Search for a domain</label>
                    <input ref={c => (input = c)} type="text" className="mini" id="domain-input" />
                    {(!searching) && (
                        <button className="butt butt-search">Search</button>
                    )}
                    {(searching) && (
                        <Loading />
                    )}
                </form>
                {!!(domains && domains.domain) && (
                    <div className="dash-domain__result">
                        <strong>{domains.domain}</strong>
                        {(domains.available) && ([
                            <p className="mini faded"><span className="green">Available</span> —  <FormattedDomainCost domain={domains.domain} tlds={tlds} /></p>,
                            <DomainContact onDomainSelection={onDomainSelection} domain={domains.domain} addingDomain={addingDomain} />
                        ])}
                        {(!domains.available) && (
                            <p className="mini faded"><span className="red">Unavailable</span> — Try searching for another domain name</p>
                        )}
                    </div>
                )}
            </div>
            <div className="dash-domain">
                <p className="half-mb">Already have a domain?</p>
                <form className="form" onSubmit={event => {
                    event.preventDefault()
                    if(existingInput.value) {
                        onDomainSelection(existingInput.value, false, undefined, registrarInput.value)
                    }
                }}>
                    <div className="half-mb">
                        <label className="mini faded" for="existing-domain-input">Add your domain to {page.data.name}</label>
                        <input ref={c => (existingInput = c)} type="text" className="mini half-mb" id="existing-domain-input" placeholder="abc.com" />
                        <label className="mini faded" for="registrar-input">Do you know who you purchased your domain name from? (optional)</label>
                        <input ref={c => (registrarInput = c)} type="text" className="mini" id="registrar-input" placeholder="e.g. 123 Reg, GoDaddy, etc..." />
                    </div>
                    <button className="butt butt--existing-domain">Add</button>
                </form>
            </div>
        </div>
    )
}

export default DomainSearch
