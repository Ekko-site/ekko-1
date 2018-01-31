module.exports = ({ userEmail, domain }) => {
    return {
        subject: 'New domain request',
        text: `New domain request. Email: ${userEmail}. Domain: ${domain}.`
    }
}
