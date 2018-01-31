module.exports = ({ total, date, plan }) => {
    return {
        subject: 'Ekko invoice paid',
        text: `<p>Hey. Just for your records, you've paid £${ total } on ${ date } for your Ekko service this ${ plan == 'pro' ? 'month' : 'year' }. Thanks!</p>`
    }
}
