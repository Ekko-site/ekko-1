import Slack from "node-slack";
const slack = new Slack(
  "https://hooks.slack.com/services/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"
);

const send = ({ text }) => {};
// slack.send({
//   text: `${
//     process.env.NODE_ENV !== "production" ? "[development]" : ""
//   } ${text}`
// });

export default {
  newSignUp: ({ name, email }) => {
    send({
      text: `New sign up! 👤 Name: ${name} Email: ${email}`
    });
  },
  newFacebookConnect: ({ facebookUserId, id }) => {
    send({
      text: `New Facebook connection. Ekko user ${id} connected their Facebook account ${facebookUserId}`
    });
  },
  newPagePicked: ({ userId, pageName, facebookPageId, siteURL }) => {
    send({
      text: `New Facebook Page connected to Ekko. Page "${pageName}" with an ID of ${facebookPageId}. See their page <${siteURL}|on Ekko>`
    });
  },
  newUserUpgrade: ({ userId, plan, email }) => {
    send({
      text: `The user ${userId} upgraded to the ${plan} plan. Contact them at ${email}`
    });
  },
  newDomainAdded: ({ domainName, userId, registered }) => {
    send({
      text: `The user ${userId} added the domain ${domainName} to their Ekko account. It ${
        registered ? "was" : "wasn't"
      } registered through DNSimple.`
    });
  },
  themeChange: ({ pageId, themeId }) => {
    send({
      text: `The page ${pageId} was changed to Theme ${themeId}`
    });
  },
  pageOnlineChange: ({ pageId, online }) => {
    send({
      text: `The page ${pageId} was switched ${online ? "online" : "offline"}`
    });
  },
  pageFetchedFromWebhook: ({ pageId }) => {
    send({
      text: `The page ${pageId} was fetched from Facebook after a webhook`
    });
  },
  subscriptionExtended: ({ customer, period_end }) => {
    send({
      text: `The Stripe customer ${customer} extended their subscription until ${period_end}`
    });
  }
};
