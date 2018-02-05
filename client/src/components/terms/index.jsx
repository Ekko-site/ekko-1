import React from 'react'
import Helmet from 'react-helmet'

const Terms = () => {
    return <div className="container">
        <Helmet
            title="Terms"
            meta={[
                {
                    name: 'description',
                    content: `Ekko's terms and conditions`
                }
            ]}
        />
        <h1>Terms of Service Agreement</h1>
        <hr />
        <p>
            By using Ekko and the <strong>ekko.site</strong> web site ("Service"), you are agreeing to be bound to the following terms and conditions ("Terms of Service").<br />
            Ekko reserves the right to update and change the Terms of Service at it's discretion without notice. Any new features in excess to the current Service shall be subject to the Terms of Service. Continued use of the Service after any such changes shall constitute your consent to such changes. You can review the most current version of the Terms of Service at any time at: https://ekko.site/terms<br />
            Violation of any of the terms below may result in immediate termination of your Service account.
      </p>
        <hr />
        <h2>Account Terms</h2>
        <ul>
            <li>Accounts registered by automated methods are not permitted and will be deleted immediately without notice.</li>
            <li>You must provide your legal full name, a valid email address, and any other pertinent information requested in order to complete the sign-up process.</li>
            <li>You are responsible for maintaining the security of your account and password. Ekko cannot and will not be liable for any loss of information or security breaches that result from your failure to comply with this security obligation.</li>
            <li>You are hereby considered fully responsible for all content posted and any and all activity that occurs under your account.</li>
            <li>You may not use the Service for any illegal activities. You must not, in your use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). Should you engage in any illegal activities through the Service, you agree to hold Ekko blameless and not liable for any damages or crimes that may occur as a result. You will also have your account immediately shut down, and all data there-in removed.</li>
            <li>You may not use the Service to sell or distribute offensive or illegal content (goods, software, products or material). You agree Ekko holds the right to determine what is considered "offensive" as pertaining to this agreement. Offensive and illegal content include: things that are sexually-oriented or pornographic, drugs, gambling, things that promote hate or violence towards others. You will have your account immediately shut down, and all data there-in deleted should you sell or distribute illegal or offensive content.</li>
            <li>You understand that the Service uses a the 3rd party payment processor Stripe (https://stripe.com) to handle payment transactions.</li>
        </ul>
        <hr />
        <h2>Payment and Refunds Terms</h2>
        <ul>
            <li>A valid credit card is required for paying accounts. A credit card is not required upon initial sign up.</li>
            <li>For accounts that are signed up to a plan that charges a monthly fee, the Service bills on a monthly basis and that fee is non-refundable. Accounts are not prorated. There will be no refunds or credits or upgrade/downgrade refunds.</li>
            <li>All fees exclude any taxes, levies, or duties imposed by taxing authorities, and you shall be responsible for payment of all such taxes, levies, or duties.</li>
        </ul>
        <hr />
        <h2>Cancellation and Termination</h2>
        <ul>
            <li>It is your responsibility to ensure that your account has been properly canceled. An email requesting an account to be canceled is not considered a cancellation. You can cancel your account at any time from the "Settings" section within the Service.</li>
            <li>All of your Content will be immediately removed from the Service should you initiate cancellation. This information can not be recovered once your account is canceled.</li>
            <li>Your cancellation will be effective immediately once initiated. You will not be charged again from that point forward.</li>
            <li>Ekko has the right to suspend or terminate your account and refuse any and all current or future use of the Service for any reason at any time. Ekko, in it's sole discretion, reserves the right to refuse service to anyone for any reason at any time.</li>
        </ul>
        <hr />
        <h2>Modifications to the Service and Prices</h2>
        <ul>
            <li>Ekko reserves the right at any time, with or without notice, to modify or discontinue the Service, temporarily or permanently.</li>
            <li>Ekko reserves the right to change the prices of any and all Services at any time.</li>
            <li>Ekko shall not be liable to you or to any third party for any modification, price change, suspension or discontinuance of the Service.</li>
        </ul>
        <hr />
        <h2>Copyright and Content Ownership</h2>
        <ul>
            <li>The Service itself including the use of the Ekko name, logos, domain names and other distinctive brand features are protected by copyright and other laws: © Ekko, All rights reserved. You may not duplicate, copy, or reuse any portion of the code (HTML/CSS/Javascript) or visual design elements.</li>
            <li>You retain your rights to any content you submit, post or display on or through the Service. Ekko claims no ownership to any content you post to the Service.</li>
        </ul>
        <hr />
        <h2>General Conditions</h2>
        <ul>
            <li>Your use of the Service is at your own risk. The service is provided on an "as is" and "as available" basis.</li>
            <li>Technical support is available to account holders and is only available via our social channels and email.</li>
            <li>You acknowledge and understand that Ekko uses third party vendors to provide the necessary hardware, software, networking, storage, and related technology required to run the Service.</li>
            <li>You must not modify, adapt or hack the Service or modify another website so as to falsely imply that it is associated with the Service or Ekko.</li>
            <li>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service.</li>
            <li>Verbal, physical, written or other abuse (including threats of abuse or retribution) of any Ekko employee, member, or officer will result in immediate account termination and potential criminal charges.</li>
            <li>Ekko does not warrant that (i) the service will meet your specific requirements, (ii) the service will be uninterrupted, timely, or error-free, (iii) the quality of any products, services, information, or other material purchased or obtained by you through the service will meet your expectations.</li>
            <li>You expressly understand and agree that Ekko shall not be liable for any direct, indirect, incidental, special, consequential or exemplary damages, including but not limited to, damages for loss of profits, goodwill, use, data or other intangible losses (even if Ekko has been advised of the possibility of such damages), resulting from: (i) the use or the inability to use the service; (ii) the cost of procurement of substitute goods and services resulting from any goods, data, information or services purchased or obtained or messages received or transactions entered into through or from the service; (iii) unauthorized access to or alteration of your transmissions or data; (iv) statements or conduct of any third party on the service; (v) or any other matter relating to the service.</li>
            <li>You expressly understand and agree that Ekko shall not be liable for any payments and monetary transactions that occur through your use of the Service. You expressly understand and agree that all payments and monetary transactions are handled by the 3rd party payment platform the Service uses: Stripe (https://stripe.com). You agree Ekko shall not be liable for any issues regrading financial and monetary transactions between you and any other party.</li>
            <li>The failure of Ekko to aggressively enforce any right or provision of the Terms of Service shall not be construed as a waiver of such right or provision. The Terms of Service outlines the entire agreement between you and Ekko and supersedes any prior agreements between you and Ekko including prior iterations of the Terms of Service.</li>
        </ul>
    </div>
}

export default Terms
