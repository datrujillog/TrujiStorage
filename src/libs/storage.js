import { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import fs from 'fs'
import config from '../config/config.js'

const client = new S3Client({
  region: config.awsBucketRegion,
  credentials: {
    accessKeyId: config.awsBucketAccessKey,
    secretAccessKey: config.awsBucketSecretAccessKey
  }
})