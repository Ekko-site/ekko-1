import HerokuClient from 'heroku-client'
const heroku = new HerokuClient({ token: process.env.HEROKU_API_TOKEN })

class Heroku {
    async addDomain(domain) {
        if(process.env.NODE_ENV !== 'production'){
            return true
        }
        const addedDomain = await heroku.post('/apps/ekko-serve/domains', {
                                                body:
                                                    { hostname: domain }
                                                }
                                             )
        return addedDomain
    }
}

export default Heroku
