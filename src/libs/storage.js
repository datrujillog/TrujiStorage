import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import fs from 'fs'
import path from 'path'

import { v4 as uuidv4 } from 'uuid';

import config from '../config/config.js'
import { BadRequest, NotFound } from '../middleware/errors.js';
import env from '../config/env.js';

const client = new S3Client({
    region: env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
})

async function uploadFile(file) {
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
        // Verificar si el archivo existe
        await client.send(new HeadObjectCommand(downloadParams));

        // Si el archivo existe, procedemos a descargarlo
        const response = await client.send(command);
        return response.Body.pipe(fs.createWriteStream(`./downloads/${fileName}`, { end: true }));
        // También puedes enviar la respuesta directamente al cliente si prefieres
        // return response.Body.pipe(res);
    } catch (error) {
        if (error.name === 'NotFound') {
            // Si el archivo no se encuentra, lanzamos un mensaje indicando que no se encontró
            throw new NotFound("File not found");
        } else {
            console.error("Error downloading file:", error);
            throw new BadRequest("An error occurred while downloading the file");
        }
    }
};

const deleteFiles = async (fileName) => {
    try {
        // Verificar si el archivo existe
        const headParams = {
            Bucket: config.awsBucketName,
            Key: `uploads/${fileName}`
        };
        const headCommand = new HeadObjectCommand(headParams);
        await client.send(headCommand);

        // Si no se produce un error al verificar la existencia del archivo, procedemos a eliminarlo
        const deleteParams = {
            Bucket: config.awsBucketName,
            Key: `uploads/${fileName}`
        };
        const deleteCommand = new DeleteObjectCommand(deleteParams);
        await client.send(deleteCommand);

        return {
            success: true,
            message: 'File deleted successfully',
            key: deleteParams.Key,
            fileName
        };
    } catch (error) {
        if (error.name === 'NotFound') {
            // Si el archivo no se encuentra, lanzamos un mensaje indicando que no se encontró
            return {
                success: false,
                message: 'File not found',
                fileName
            };
        } else {
            console.error("Error deleting file:", error);
            throw new BadRequest("An error occurred while deleting the file");
        }
    }
};


const uploadFiles = async (files) => {
    const promises = files.map(file => uploadFile(file));
    const results = await Promise.allSettled(promises);

    return results;
}

export {
    uploadFiles,
    downloadFile,
    deleteFiles
};