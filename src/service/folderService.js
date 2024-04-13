import { BadRequest } from '../middleware/errors.js';
import folderRepository from '../repositories/folderRepository.js';

import { deleteFiles, downloadFile, uploadFiles } from '../libs/storage.js';
import parseFolder from '../libs/normalize.js';

class FolderService {
    static #instance;

    constructor() {
        if (!FolderService.#instance) {
            FolderService.#instance = this;
        }

        return FolderService.#instance;
    }

    async createFolder(ownerId,name,parentFolderId) {

        const data =  await parseFolder(ownerId, name, parentFolderId);

        const results = await folderRepository.createFolder(data); 
        const { success, folder: folderCreate } = results;
 
        return {
            success: true,
            folder: folderCreate
        
        }
    }

    async getFolders(userId) {
        const results = await folderRepository.getFolders(userId);
        const { success, folders } = results;

        return {
            success: true,
            folders
        }
    }

    
}

export default new FolderService();
