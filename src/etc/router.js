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

const extractParams = (route) => {
    let { params } = route
    const argParams = params.reduce((accum, curr) => {
        let key = Object.keys(curr)[0]
        accum[key] = curr[key]
        return accum
    }, {})
    return argParams
}

const findRoute = (controller, url) => {
    const controllerObject = Controllers[controller]
    const routes = Object.keys(controllerObject).map(route => {
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
    let match = routes.find(route => {
        return route.regexp.test(url)
    })

    return match
}

const router = async (req, res, next, ravenClient) => {
    const url = req.originalUrl
    const { controller } = req.params
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
    const route = findRoute(controller, url)
    if (!route){
        return res.sendStatus(404)
    }
    const argParams = extractParams(route)
    const args = { ...req.body, ...req.query, ...argParams, user: req.user, req }
    let obj
    const { method } = route
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
