const fs = require('fs')
const Facebook = require('./../../api/dist/etc/facebook')

const PAGE_ID = '183329475082348'
const TOKEN = 'EAAM0ef6OjtMBACIlbvjXpqDOvUZBTjZBtODdQBauNayVb6lDmhjBfo373wkRv2JBpAQjcDqSFKHJbX87tQYZCQ7e6IJR2XTKMBiNNquysguIZA7SWlv4ZBm9xAqNNIcxthYnZBTxmqq8YfA3h8NXtSrJ10OOPenV8ZD'

let facebook = new Facebook();

(async () => {
    const result = await facebook.fetchPage(PAGE_ID, TOKEN, false, {
        preview: true
    })
    let data = result.data
    let file = `${PAGE_ID}-${data.name}.json`
    fs.writeFile(`./../../themes/mock/${file}`, JSON.stringify(data), err => {
        if (err) {
            return console.log(err)
        }

        console.log("Page fetched and saved")
    });
})()
