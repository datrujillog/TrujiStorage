import { BadRequest } from '../middleware/errors.js';
import fileRepository from '../repositories/fileRepository.js';

import { deleteFiles, downloadFile, uploadFiles } from '../libs/storage.js';

class FilesService {
    static #instance;

    constructor() {
        if (!FilesService.#instance) {
            FilesService.#instance = this;
        }

        return FilesService.#instance;
    }

    async uploadMany(files, userId) {
        const results = await uploadFiles(files);
        const promises = results.map(async (result) => {
            if (result.status === 'fulfilled') {
                return await fileRepository.createFile(result.value, userId);
            }
        });

        const results2 = await Promise.all(promises);
        return {
            success: true,
            message: 'Files uploaded successfully',
            data: results2
        };
    }

    async download(fileName, res) {
        try {
            const file = await fileRepository.findFileByName(fileName);
            if (!file.success) throw new BadRequest(file.error);

            if (file) {
                return await downloadFile(fileName, res);
            }

            return {
                success: false,
                message: "File not found",
                res
            };
        } catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }

    async deleteFile(fileName) {
        try {
            const results = await deleteFiles(fileName);
            if (!results.success) throw new BadRequest(results);
            const { success, deletedFiles } = results;
            const key = deletedFiles.map((file) => file.key); 
            const deleteFile = await fileRepository.deleteMany(key);
            if (!deleteFile.success) throw new BadRequest(deleteFile.error);

            return {
                success: true,
                message: "File deleted successfully",
                deleteFile
            };
        } catch (error) {
            throw new BadRequest(error.message);
        }
    }
}

export default new FilesService();
