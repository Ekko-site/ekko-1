import React from 'react'

const Mailchimp = () => {
    return (
        <div id="mc_embed_signup" className="mx-auto max-width-3 modal--mailchimp">
          <h2 className="normal center">Well, we're not <em>quite</em> ready yet&hellip;</h2>
          <p className="big-mb">We're currently Beta testing with a small collection of customers, to make sure Ekko will be totally <strong>brilliant</strong> for launch. If you're interested in Beta testing Ekko, do leave your details below.</p>
          <h3 className="center raspberry">Apply to beta test</h3>
          <form action="//site.us14.list-manage.com/subscribe/post?u=158565037b373ba01d3c0a66e&amp;id=eac76d54a3" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" novalidate>
                <input type="email" key="email" placeholder="Email address" name="EMAIL" className="p1 border rounded" id="mce-EMAIL" /><button>Apply</button>
          </form>
        </div>
    )
}

export default Mailchimp
