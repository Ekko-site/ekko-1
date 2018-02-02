import pathToRegExp from 'path-to-regexp'
import Controllers from '@/controllers'
import response from '@/etc/response'
import api from '@/etc/api'
import { logger } from '@/etc/logger'
import cleanError from '@/etc/clean-error'

const respondWithError = ({ e, res, ravenClient }) => {
    const { code, message } = e
    logger.error(code, message)
    ravenClient.captureException(e)
    if(code == 502){
        return response({
            status: 400,
            data: {
                error: cleanError(message)
            },
            res
        })
    }
    const userFriendlyMessage = cleanError(message)
    return response({
        status: code,
        data: {
            error: userFriendlyMessage
        },
        res
    })
}

const router = async (req, res, next, ravenClient) => {
    const url = req.originalUrl
    let parts = url.split('/').filter(Boolean)
    let controller = parts[0] == 'api' ? parts[1] : parts[0]
    if(parts[0] == 'api') {
        let result
        try {
             result = await api(req)
        } catch (e) {
            return respondWithError({
                e,
                res,
                ravenClient
            })
        }
        if(result && result.data){
            return response({
                data: result.data,
                res
            })
        }
    }
    const controllerObject = Controllers[controller]
    if(!controllerObject) {
        return res.sendStatus(404)
    }
    let routes = Object.keys(controllerObject).map(route => {
        let keys = [],
            re = pathToRegExp(route, keys)
            if(re.test(url)){
                let result = re.exec(url)
                keys = keys.map((key, i) => {
                    return {
                        [key.name]: result[i + 1]
                    }
                })
            }
        return {
            route,
            regexp: re,
            method: controllerObject[route],
            params: keys
        }
    })
    let matches = routes.filter(route => {
        return route.regexp.test(url)
    })
    const routeMatch = matches.length && matches[0]
    if(!routeMatch){
        return res.sendStatus(404)
    }
    let { params } = routeMatch
    let argParams = params.reduce((accum, curr) => {
        let key = Object.keys(curr)[0]
        accum[key] = curr[key]
        return accum
    }, {})
    const args = { ...req.body, ...req.query, ...argParams, user: req.user, req }
    let obj,
        { method } = routeMatch
    if(typeof method !== 'function'){
        method = method[req.method.toLowerCase()]
    }
    try {
        obj = await method(args)
    } catch (e) {
        return respondWithError({
            e,
            res,
            ravenClient
        })
    }
    return response({
        data: obj || {},
        res
    })
}

export default router
