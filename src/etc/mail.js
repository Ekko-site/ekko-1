var Sendgrid = require('sendgrid-web')
var sendgrid = new Sendgrid({
    user: process.env.SENDGRID_USERNAME,
    key: process.env.SENDGRID_PASSWORD
})

import { logger } from './logger'
var messages = require('./emails')
var renderEmail = require('./emails/render')

let send = ({
    to,
    type,
    data = {}
}) => {
    let message = messages[type]
    if(!message) {
        return
    }
    let { text, subject } = message(data)
    const html = renderEmail({
        content: text,
        title: subject
    })
    if(!to) {
        return
    }
    logger.info('Sending email to, with subject', to, subject, text)
    return process.env.NODE_ENV == 'production' && sendgrid.send({
        to,
        from: 'hello@ekko.site',
        fromname: 'Ben from Ekko',
        subject,
        html
    }, (err, json) => {
        if (err) {
            return console.error(err)
        }
        logger.info('Mail response', to, json)
    })
}

module.exports = {
    send
}
