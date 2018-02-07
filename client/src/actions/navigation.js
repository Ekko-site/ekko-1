import * as types from '@/constants/action-types'

export const go = (actionType, payload) => {
    const type = types[actionType]
    if (!type) return console.error(`Navigation type ${type} not found in Types`)
    return {
        type,
        payload
    }
}
