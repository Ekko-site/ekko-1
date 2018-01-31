module.exports = ({ total, date }) => {
    return {
        subject: 'Ekko payment paid',
        text: `<p>Hey. Just for your records, you've paid £${ total } on ${ date } for your Ekko service this month. Thanks!</p>`
    }
}
