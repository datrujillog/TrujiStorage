import AWS from 'aws-sdk'
import config from '../config/config.js'
import path from 'path'
import upload from '../middleware/upload.js'
import env from '../config/env.js'

const s3 = new AWS.S3()

class FilesService {
    constructor() {

    }


    async upload(fileName, file) {
        //TODO SOLUCIONAR EL PROBLEMA DE MUTER
        try {

            const ext = path.extname(fileName);
            const uploadParams = {
                Bucket: config.awsBucketName,
                Key: `uploads/${Date.now()}${ext}`,
                Body: file
            };
            const uploadResult = await s3.upload(uploadParams).promise();
            console.log('UPLOAD RESULT:', uploadResult);
            const key = uploadResult.Key;
            const url = `${config.cloudFrontUrl}/${key}`;
            const location = uploadResult.Location;

            return {
                success: true,
                key,
                url,
                message: "File uploaded successfully",
                location
            };

        } catch (error) {
            console.error('UPLOAD ERROR:', error);
            return { success: false, message: "An error occurred" };
        }
    }

    async download(fileName) {

        try {

            const result = s3.getObject({
                Key: `uploads/${fileName}`,
                Bucket: env.AWS_BUCKET_NAME,
            }).createReadStream()

            return { 
                success: true,
                message: "File downloaded successfully",
                data: result
            }

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