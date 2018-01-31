import models from './../../models/'
const { Track } = models

class Tracks {
    constructor(db) {
        this.db = db || Track
    }
    async getByPageIds(ids) {
        let query = `select "PageId", month, count(*)
        from (
            SELECT "Tracks"."PageId",
                   date_trunc('month', "Tracks"."createdAt") AS month
            FROM "Tracks"
            WHERE "Tracks"."PageId" IN (${ids.join(',')})
        ) t
        group by month, "PageId"`
        const tracks = await this.db.sequelize.query(query)
        return tracks && tracks.length ? tracks[0] : []
    }
    async addTrackingForPage(id) {
        const created = await this.db.create({
            PageId: id
        })
        return created
    }
}

export default Tracks
