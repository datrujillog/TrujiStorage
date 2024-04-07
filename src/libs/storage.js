



/**
 * Uploads an image to Amazon S3.
 * @param {Buffer} image - The image to upload.
 */
function uploadImageToS3(image) {
    // Create a new S3 client.
    const s3 = new AWS.S3();
  
    // Set the parameters for the upload.
    const params = {
      Bucket: 'my-bucket', // The name of the bucket to upload the image to.
      Key: 'my-image.jpg', // The name of the file to upload.
      Body: image, // The image to upload.
    };
  
    // Upload the image to S3.
    s3.upload(params, function(err, data) {
      if (err) {
        // Handle the error.
      } else {
        // The image was uploaded successfully.
      }
    });
  }
  


/**
 * Downloads an image from an S3 bucket.
 * @param {string} bucketName - The name of the bucket to download the image from.
 * @param {string} key - The name of the file to download.
 * @returns {Promise<Buffer>} - A promise that resolves to the image data as a Buffer.
 */
  async function downloadImageFromS3(bucketName, key) {
    // Create a new S3 client.
    const s3 = new AWS.S3();
  
    // Set the parameters for the download.
    const params = {
      Bucket: bucketName, // The name of the bucket to download the image from.
      Key: key, // The name of the file to download.
    };
  
    // Download the image from S3.
    const data = await s3.getObject(params).promise();
  
    // Return the image data.
    return data.Body;
  }
  









  /**
 * Deletes an object from an S3 bucket.
 * @param {string} bucketName - The name of the bucket to delete the object from.
 * @param {string} key - The name of the object to delete.
 * @returns {Promise} - A promise that resolves when the object has been deleted.
 */
async function deleteObjectFromS3(bucketName, key) {
    // Create a new S3 client.
    const s3 = new AWS.S3();
  
    // Set the parameters for the delete operation.
    const params = {
      Bucket: bucketName, // The name of the bucket to delete the object from.
      Key: key, // The name of the object to delete.
    };
  
    // Delete the object from S3.
    await s3.deleteObject(params).promise();
  }
  