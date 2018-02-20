import { fetchPublicPage } from '@/controllers/pages/get'
import layout from '@/themes/layouts/default'

export default async ({ params: { facebookPageID } }, res, next) => {
    const { page, theme } = await fetchPublicPage({
        id: facebookPageID
    })
    const { name } = theme
    const Theme = await import(`./themes/${ name }/js/layout`)
    console.log(Theme)
    return res.sendStatus(200)
}
