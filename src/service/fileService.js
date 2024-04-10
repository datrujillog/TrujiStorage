// import AWS from 'aws-sdk'
import config from '../config/config.js'
import path from 'path'
import upload from '../middleware/upload.js'
import env from '../config/env.js'

import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { uploadFile } from '../libs/storage.js'

// const s3 = new AWS.S3()

class FilesService {
    constructor() {

    }

    async uploadMany(files) {
        const results = await uploadFile(files)

        return results
    }

   
    




    async download(fileName) {

        try {

           

        } catch (error) {
            console.log(error)
            return { success: false, message: "An error ocurred" }
        }
    }

    async delete(fileName) {
        try {
            const result = await s3.deleteObject({
                Key: `uploads/${fileName}`,
                Bucket: config.awsBucketName
            }).promise()

            return {
                success: true,
                message: "File deleted successfully",
                key: fileName
            }

        } catch (error) {
            console.log(error)
            return { success: false, message: "An error ocurred" }
        }
    }


}

export default FilesService