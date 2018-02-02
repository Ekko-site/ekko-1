import groupBy from 'lodash.groupby'

import { Tracks, Pages } from '@/services'

const get = {
    async one({ id }) {
        const tracks = new Tracks()
        const track = await tracks.getById(id)
        return {
            track
        }
    },
    async allForUser({ id }) {
        const pages = new Pages()
        const tracks = new Tracks()
        const userPages = await pages.getByUserId(id)
        if(!userPages.length){
            return {
                tracks: []
            }
        }
        const pageTracks = await tracks.getByPageIds(userPages.map(page => page.get('id')))
        if(!pageTracks.length){
            return {
                tracks: []
            }
        }
        return {
            tracks: groupBy(pageTracks.map(pageTrack => {
                let page = userPages.find(page => page.id == pageTrack.PageId)
                return Object.assign({}, pageTrack, {
                    name: page.data.name
                })
            }), 'PageId')
        }
    }
}

export default get
