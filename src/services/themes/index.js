import { Theme } from '@/models'

class Themes {
    constructor(db) {
        this.db = db || Theme
    }
    async getById(id) {
        const theme = await this.db.findById(id)
        return theme ? theme.get({
            plain: true
        }) : null
    }
    async getDefault() {
        const theme = await this.db.findById(8)
        return theme ? theme.get({
            plain: true
        }) : null
    }
    async getAll() {
        const themes = await this.db.findAll()
        return themes
    }
}

export default Themes
