import MediaStore from '@/etc/media-store'

const mediaStore = new MediaStore()

const formatPageForDisplay = page => {
    if(page.data.cover){
        page.data.cover.source = mediaStore.formURL(page.data.cover.source)
    }
    if(page.data.picture){
        page.data.picture.url = mediaStore.formURL(page.data.picture.url)
    }
    if(page.data.posts && Array.isArray(page.data.posts)){
        page.data.posts = page.data.posts.map(post => {
            if(!post.full_picture){
                return post
            }
            return {
                ...post,
                full_picture: mediaStore.formURL(post.full_picture)
            }
        })
    }
    if(page.data.events && Array.isArray(page.data.events)){
        page.data.events = page.data.events.map(event => {
            if(!event.cover){
                return event
            }
            return {
                ...event,
                cover: {
                    ...event.cover,
                    source: mediaStore.formURL(event.cover.source)
                }
            }
        })
    }
    return page
}

export default formatPageForDisplay
