import AWS from 'aws-sdk'
// const { config } = require("dotenv")
import config from '../config/config.js'
import path from 'path'

// const s3 = new AWS.S3({ region: config.awsRegion })
const s3 = new AWS.S3()
// Initialize the Amazon Cognito credentials

class FilesService {
    constructor() {

    }


    async upload(fileName, file) {
        try {

            const ext = path.extname(fileName)


            // const PassStream = new PassThrough()

            const result = await s3.upload({
                Bucket: config.awsBucketName,
                Key: 'uploads' + Date.now() + ext,
                Body: file
            }).promise()

            // regidtrar en la base de datos

            console.log('UPLAOD <> ', result)

            return {
                success: true,
                key: result.Key,
                // url: `${config.cloudFrontUrl}/${result.Key}`,
                message: "File uploaded successfully",
                location: result.Location
            }


        } catch (error) {
            console.log(error)
            return { success: false, message: "An error ocurred" }
        }


    }



}

export default FilesService