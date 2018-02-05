import React from 'react'
import currencyFormatter from 'currency-formatter'
import parseDomain from 'parse-domain'

const findDomainCost = ({ domain, tlds }) => {
    const tld = parseDomain(domain).tld
    const tldObj = tlds.find(t => t.name == tld)
    const tldCost = tldObj.cost
    let chargeAmount
    if(tldCost <= 8.40) {
        chargeAmount = 'Free, included in subscription'
    } else {
        chargeAmount = `${currencyFormatter.format(tldCost, { code: 'GBP' })} per year. After hitting "Purchase" below, you will be charged immediately.`
    }
    return <span>{ chargeAmount }</span>
}

export default findDomainCost
