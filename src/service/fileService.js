import { BadRequest } from '../middleware/errors.js'

import FileRepository from '../repositories/fileRepository.js'

import { downloadFile, uploadFile } from '../libs/storage.js'

class FilesService extends FileRepository {
    constructor() {
        super()

    }

    async uploadMany(files) {
        const results = await uploadFile(files)
        // gardar en la base de datos los archivos subidos
        const promises = results.map(async (result) => {
            if (result.status === 'fulfilled') {
                return await this.createfileName(result.value)
            }
        })

        const results2 = await Promise.all(promises)
        return {
            success: true,
            message: 'Files uploaded successfully',
            // data: results2
            data: results2
        }
    }


    async download(fileName, res) {

        const file = await this.findFileById(fileName)
        if(!file.success) throw new BadRequest("Datos no encontrados en la base de datos")

        if (file) {
            return await downloadFile(fileName, res)
        }
        return {
            success: false,
            message: "File not found",
            res
        }


    }







    // async delete(fileName) {
    //     try {
    //         const result = await s3.deleteObject({
    //             Key: `uploads/${fileName}`,
    //             Bucket: config.awsBucketName
    //         }).promise()

    //         return {
    //             success: true,
    //             message: "File deleted successfully",
    //             key: fileName
    //         }

    //     } catch (error) {
    //         console.log(error)
    //         return { success: false, message: "An error ocurred" }
    //     }
    // }


}

export default FilesService