import React from 'react'

import FacebookConnection from '@/components/facebook-connection'

class FacebookConnect extends React.Component {
    render() {
        return <div className="container huge-mb">
			<div className="grid">
				<div className="grid__item one-whole desk--five-sixths push--desk--one-twelfth">
					<h1 className="center">Sign up to Ekko</h1>
					<p className="center progress-list">
						<span>1. Your profile</span>
						<span className="divide">&#8594;</span>
						<span className="progress-list__current">2. Connect Facebook</span>
					</p>
					<div className="grid mt-big">
						<div className="grid__item palm--one-whole one-half">
                            {(this.props.existingFacebookUser) && (
                                <p>Oops, we already have a user with that Facebook account. Try connecting a different Facebook account.</p>
                            )}
                            {(!this.props.existingFacebookUser) && ([
                                <p>For Ekko to work, we need access to your Facebook account, and therefore the pages you have access to. We only use this access to read information into Ekko, we never change anything on your Facebook account or affect your page content.</p>,
    							<p>Once you've connected and selected a Facebook page, you'll then be taken to your Ekko dashboard, where all settings can be managed.</p>
                            ])}
						</div>
                        <div className="grid__item palm--one-whole one-half center">
					 		<h2>Let's go!</h2>
                            <FacebookConnection cssClass="butt butt--big butt--fb" callback={res => this.props.facebookConnect({
                                facebook_id: res.id,
                                facebook_access_token: res.accessToken
                            })} />
						</div>
					</div>
				</div>
			</div>
		</div>
    }
}

export default FacebookConnect
