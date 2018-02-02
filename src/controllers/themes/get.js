import { Themes } from '@/services'

const get = {
    async one({ id }) {
        const themes = new Themes()
        const theme = await themes.getById(id)
        return {
            theme
        }
    },
    async all() {
        const themes = new Themes()
        const allThemes = await themes.getAll()
        return {
            themes: allThemes
        }
    }
}

export default get
