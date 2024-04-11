import { S3Client } from '@aws-sdk/client-s3';
import env from '../config/env.js';

// Instancia única del cliente de AWS S3

const client = new S3Client({
    region: env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
    }
})

export default client;
