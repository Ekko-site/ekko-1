module.exports = ({ siteURL, pageName }) => {
    return {
        subject: 'Your new Ekko website',
        text: `<p>We\'ve connected your Facebook Page "${pageName}" to Ekko.</p><p>This means every time you update this Facebook Page, either by adding a new post, or changing your information on the Page, your Ekko website will update automatically.</p><p>While you\'re still in preview mode, your website can be viewed on this temporary web address: <a href="${siteURL}">${siteURL}</a>.</p><p>If you decide you want to become a paid Ekko customer, you\'ll get the chance to connect a real domain name to your website.</p>`
    }
}
