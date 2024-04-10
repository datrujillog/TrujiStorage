import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid';

import config from '../config/config.js'
import { BadRequest } from '../middleware/errors.js';

const client = new S3Client({
    region: config.awsBucketRegion,
    credentials: {
        accessKeyId: config.awsBucketAccessKey,
        secretAccessKey: config.awsBucketSecretAccessKey
    }
})

async function uploadFiles(file) {
    try {
        const stream = fs.createReadStream(file.path);
        const ext = path.extname(file.filename);
        const fileName = uuidv4() + ext;

        const uploadParams = {
            Bucket: config.awsBucketName,
            Key: `uploads/${fileName}`,
            Body: stream
        };
        const command = new PutObjectCommand(uploadParams);
        await client.send(command);
        return {
            success: true,
            message: 'File uploaded successfully',
            originalName: file.originalname,
            key: uploadParams.Key,
            filename: uploadParams.Key,
            fileName
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new BadRequest("An error occurred while uploading the file")
    }

}

const downloadFile = async (fileName, res) => {
    const downloadParams = {
        Bucket: config.awsBucketName,
        Key: `uploads/${fileName}`
    };
    const command = new GetObjectCommand(downloadParams);
    try {
        const response = await client.send(command);
        return response.Body.pipe(fs.createWriteStream(`./downloads/${fileName}`, {end: true}))
        // return response.Body.pipe(res)
    } catch (error) {
        console.error("Error downloading file:", error);
        throw new BadRequest("An error occurred while downloading the file")
    }
}


const uploadFile = async (files) => {
    const promises = files.map(file => uploadFiles(file));
    const results = await Promise.allSettled(promises);

    return results;
}

export {
    uploadFile,
    downloadFile
};