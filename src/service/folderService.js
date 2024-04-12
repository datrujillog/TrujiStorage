import { BadRequest } from '../middleware/errors.js';
import folderRepository from '../repositories/folderRepository.js';

import { deleteFiles, downloadFile, uploadFiles } from '../libs/storage.js';

class FolderService {
    static #instance;

    constructor() {
        if (!FolderService.#instance) {
            FolderService.#instance = this;
        }

        return FolderService.#instance;
    }

    async createFolder(userId,folder) {

        const results = await folderRepository.createFolder(userId, folder); 

 
        return {
            success: true,
            folder
        
        }
    }

    
}

export default new FolderService();
