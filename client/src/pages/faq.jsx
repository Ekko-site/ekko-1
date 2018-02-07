import React from 'react'
import Helmet from 'react-helmet'

const FAQ = () => {
    return <div>
        <Helmet
            title="Ekko's FAQ"
            meta={[
                {
                    name: 'description',
                    content: `Frequently asked questions about Ekko`
                }
            ]}
        />
        <div className="faq" id="faq">
            <div className="container">
                <div className="grid">
                    <div className="grid__item palm--one-whole lap--one-half desk--one-half">
                        <h2 className="h2 big-mb">FAQ</h2>
                        <p style={{
                            marginBottom: '60px'
                        }}>If there's anything we don't answer below, contact us by email on <a href="mailto:hello@ekko.site" data-tooltip="Open mail client">hello@ekko.site</a> or on Twitter <a href="https://twitter.com/ekkosite">@ekkosite</a></p>

                        <h3 className="h3">Which information from my Facebook Page is displayed on my website?</h3>
                        <p>Ekko pulls all the relevant information it can, we base this off the most common and important pieces of information we think people will want to see.</p>

                        <p>This includes: Page name, about text, description text, profile picture, cover photo, events, posts, location, opening hours &amp; email addresses.</p>

                        <p>Due to limitations with Facebook, it means that for some of the above pieces of information, you'll need to sync your Ekko website manually with your Facebook Page, but this is just one click of a button!</p>

                        <p>If you find that you have some important information that Ekko is missing from your Page, please let us know!</p>

                        <h3 className="h3">Do I need separate web hosting for the website Ekko creates?</h3>

                        <p>Absolutely not. It's possible to go from signing up to Ekko, connecting to Facebook, picking a Facebook Page to use with Ekko and switching your site online in less than 45 seconds. Things don't need to be any more difficult than that for you to get your new website online. Once you create a website on Ekko, it's stored on Ekko's servers, which mean any time someone visits your website, we display it for you!</p>

                        <h3 className="h3">Can I use my own domain name with my website?</h3>

                        <p>When you sign up to Ekko, your new website will be assigned a temporary web address you can use to view your website and to show people. Once you decide you like Ekko, you can activate your account - this means you can use your own domain name with your Ekko website.</p>

                        <p>There are two options for domain names with Ekko. If you already have a domain name that you've purchased elsewhere, we can link it to your new Ekko website. If you don't have a domain name, you can purchase one through us and we can set up all the tedious bits ourselves to link it to your new website. We've partnered with DNSimple to register the domain names, and you can see all prices on <a href="https://dnsimple.com/tld-pricing">DNSimple's website</a>.</p>

                        <h3 className="h3">What's with the banner across the bottom of my site?</h3>

                        <p>While your website's in preview mode, your site will display a "Powered by Ekko" footer banner. Once you've upgraded your subscription, our footer banner will no longer appear on your site.</p>

                    </div>
                    <div className="grid__item palm--one-whole lap--one-half desk--one-half">

                        <h3 className="h3">How dependant is Ekko on Facebook, what happens if Facebook goes down?</h3>

                        <p>Have no fear, your website will still be online. Every time you make a change to your Facebook Page, or post a new status update, Facebook informs Ekko of this update, we then fetch the latest information from your Facebook Page. We then store this data in our own database, which is then used to display on your website. If the connection to Facebook breaks, or if Facebook goes offline, your website will remain online and displaying your information, it just won't receive any <b>new</b> information until Facebook is back up!</p>

                        <h3 className="h3">Can I edit my website's style and layout?</h3>

                        <p>With Ekko, we have several themes which have been designed to adapt and complement your information elegantly. Some themes are more generic and will suit a wide range of content and businesses, whereas other themes are slightly more targeted to different sectors and industries. We believe that the quality and aesthetic of Ekko themes means you won't miss fiddling with a design! More time spent running your business, less time spent editing website layouts 👍</p>

                        <h3 className="h3">Do I get an email address with my website?</h3>

                        <p>If you already have a domain name registered, it's possible that your domain name host already provides you with an email address. If you're registering a domain through Ekko, we recommend you use the excellent G Suite from Google, which only costs $5 per user per month, and you get access to all of Google's excellent services and products, ie. Gmail, Calendar, Docs, etc...once you're set up on G Suite, we can assist you with linking up your email to your domain name, so you'll have, for example, "info@mywebsite.com".</p>

                        <h3 className="h3">Is Ekko UK only?</h3>

                        <p>Not at all. We use GoCardless for processing Direct Debits (UK only), but Ekko also uses Stripe for processing card payments, so anywhere Stripe supports, Ekko supports! The full list of supported countries are listed on <a href="https://stripe.com/global">Stripe's website</a>. Prices are displayed in GBP throughout Ekko, but will be converted by Stripe when they charge your card.</p>

                        <h3 className="h3">Do you offer any discounts?</h3>

                        <p>Yes we do. If you're a student, or work for/run a not-for-profit/charity, we offer a <span className="bold">25% discount for life</span>. Contact us at <a href="mailto:hello@ekko.site">hello@ekko.site</a> so we can get you set up!</p>

                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default FAQ
