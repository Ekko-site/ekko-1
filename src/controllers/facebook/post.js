import syncByPageId from './../pages/sync-by-page-id'
import { logger } from './../../etc/logger'
import services from './../../services/'
const { Users } = services

const post = ({ entry }) => {
    entry && entry.forEach(async change => {
        const args = {
            pageId: change.id
        }
        let result
        try {
            result = await syncByPageId(args)
        } catch (e) {
            // const users = new Users()
            // await users.failedFBFetch(args)
            logger.error('Failed FB fetch', e)
        }
    })
    return { }
}

export default post
