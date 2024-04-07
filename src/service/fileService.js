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
    



}

export default FilesService