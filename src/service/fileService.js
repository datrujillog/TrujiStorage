import { PrismaClient } from "@prisma/client";

import { BadRequest } from '../middleware/errors.js'
import FileRepository from '../repositories/fileRepository.js'

import { deleteFiles, downloadFile, uploadFiles } from '../libs/storage.js'

class FilesService extends FileRepository {
    constructor() {
        super()
        // this.fileModel = new PrismaClient()

    }

    async uploadMany(files) {
        const results = await uploadFiles(files)
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

        try {

            const file = await this.findFileById(fileName)
            if (!file.success) throw new BadRequest(file.error)

            if (file) {
                return await downloadFile(fileName, res)
            }
            return {
                success: false,
                message: "File not found",
                res
            }

        } catch (error) {
            return {
                success: false,
                message: error.message
            }

        }




    }


    async delete(fileName) {

        try {
            const results = await deleteFiles(fileName)
            if (!results.success) throw new BadRequest(results)

            const deleteFele = await this.deleteFile(results.key)
            if (!deleteFele.success) throw new BadRequest(deleteFele.error)

            return {
                success: true,
                message: "File deleted successfully",
                deleteFele
            }


        } catch (error) {
            throw new BadRequest(error.message)

        }
    }






}

export default FilesService