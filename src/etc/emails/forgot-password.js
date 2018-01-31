module.exports = ({ reset_hash }) => {
    const resetURL = `https://ekko.site/change-password?reset_hash=${ reset_hash }`
    return {
        subject: 'Reset your Ekko password',
        text: `<p>Please click on the link below to reset your Ekko password</p><p><a href="${ resetURL }">Reset password</a> Or, copy and paste the URL into your browser: ${ resetURL }</p>`
    }
}
