import React from 'react'
import moment from 'moment'

import DomainRequests from '@/components/settings/domain-request'
import FormattedDomainCost from '@/components/settings/formatted-domain-cost'
import DomainContact from '@/components/settings/domain-contact'
import Loading from '@/components/loading'

const DomainsAssigned = ({ pages, userDomains, onAddDomain, onDomainSelection, domainRequest, plans, tlds, userPlan, addingDomain }) => {

    const userDomainsOutput = userDomains.map(domain => {
        let page = pages.find(page => page.id == domain.PageId)
        if(!page){
            return null
        }
        const plan = plans.find(p => p.id == userPlan.plan)
        return <div>
            <p className="caps-title half-mb">{domain.registration_in_progress && '[pending]'} {page.data.name}</p>
            <p className="bold tiny-mb">{domain.domain}</p>
            {domain.domainId && <p className="mini faded tiny-mb">Expires: {moment(domain.expiresOn).format('Do MMM, YYYY')}</p>}
            {(!domain.domainId && !domain.dns_resolved && !domain.registration_in_progress) && (
                <DomainRequests
                    dnsRequested={domain.dns_requested}
                    domainRequest={domainRequest}
                    domainId={domain.id}
                />
            )}
            {(!domain.domainId && domain.registration_in_progress && !addingDomain) && ([
                <p className="mini faded"><span className="green">Available</span> —  <FormattedDomainCost domain={domain.domain} tlds={tlds} plan={plan} /></p>,
                <DomainContact onDomainSelection={onDomainSelection} domain={domain.domain} addingDomain={addingDomain} />
            ])}

            {(addingDomain) && (
                <Loading />
            )}
        </div>
    }).filter(Boolean)

    return <div>
        {
            userDomainsOutput
        }
    </div>
}

export default DomainsAssigned
