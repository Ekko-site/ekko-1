module.exports = ({ shouldRegister, domain, charge }) => {
  let text;
  if (shouldRegister) {
    text = `<p>We\'ve registered ${domain} for you.</p>`;
    if (charge) {
      text += ` <p>You will be charged $${charge} immediately.</p>`;
    } else {
      text += ` <p>because of the Ekko plan you're on, there is no charge for this domain registration!</p>`;
    }
  } else {
    text = `<p>You've added ${domain} to your Ekko account. We'll be in touch very shortly to complete this process!</p>`;
  }
  return {
    subject: "Your new domain",
    text
  };
};
