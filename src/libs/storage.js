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
// const s3 = new AWS.S3()

// TODO: subir un archivo al bucket
export async function uploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath)
  const uploadParams = {
    Bucket: config.awsBucketName,
    Key: `uploads/${Date.now()}_${file.name}`,
    // Key: file.name,
    Body: stream
  }
  const command = new PutObjectCommand(uploadParams)
  return await client.send(command)
}


//TODO:  obtener una lista de todos los archivos en el bucket
export async function getFiles() {
  const command = new ListObjectsCommand({
    Bucket: config.awsBucketName,
    // key: 'uploads/'
  })
  return await client.send(command)
}


//TODO: obtener un archivo en particular
export async function getFile(filename) {
  const command = new GetObjectCommand({
    Bucket: config.awsBucketName,
    Key: `uploads/${filename}`
  });
  try {
    return await client.send(command);
  } catch (error) {
    throw error; // Lanzar el error nuevamente
  }
}



// TODO: descargar un archivo del bucket

export async function downloadFile(filename) {
  const command = new GetObjectCommand({
    Bucket: config.awsBucketName,
    Key: `uploads/${filename}`
  })
  const result = await client.send(command)
  // console.log(result)
  result.Body.pipe(fs.createWriteStream(`./uploads/${filename}`))
}




// TODO: obtener la url de un archivo en el bucket para compartir o descargar
export async function getFileURL(filename) {
  const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename
  })
  return await getSignedUrl(client, command, { expiresIn: 3600 })
}



