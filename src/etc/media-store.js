import AWS from 'aws-sdk'
import got from 'got'

import { logger } from '@/etc/logger'

AWS.config.setPromisesDependency(null)
AWS.config.region = 'eu-west-1'

const s3Bucket = process.env.S3_BUCKET

const s3Params = {
    Bucket: s3Bucket,
    ACL: 'public-read'
}

export default class MediaStore {
    async upload(entity, id, pageId, url) {
        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        })
        const body = await this.download(url)
        const fileName = `${entity}/${pageId}/${id}.jpeg`
        const params = {
            ...s3Params,
            Key: fileName,
            Body: body,
            ContentType: 'image/jpeg',
            ContentLength: body.length,
            CacheControl: 'public,max-age=630720000'
        }
        let result
        try {
            result = await this.s3.putObject(params).promise()
        } catch (e) {
            console.error(e)
            throw new Error(e)
        }
        const data = {
            meta: result,
            url: this.formURL(fileName),
            fileName,
            originalUrl: url
        }
        logger.info('Uploaded to S3', data.fileName, pageId)
        return data
    }
    async download(url) {
        const response = await got(url, {
            encoding: null
        })
        return response.body
    }
    formURL(fileName) {
        if(fileName.match(/fbcdn/)){
            return fileName
        }
        return `https://${s3Bucket}.s3.amazonaws.com/${fileName}`
    }
}
