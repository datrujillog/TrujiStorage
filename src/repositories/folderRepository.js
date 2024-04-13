import { PrismaClient } from "@prisma/client";
import { BadRequest, NotFound } from "../middleware/errors.js";
import getClient from "../libs/db.js";

class UserRepository {
    static #instance; // Propiedad estática para almacenar la única instancia

    #folderModel;

    constructor() {
        if (!UserRepository.#instance) {
            UserRepository.#instance = this;
            this.#folderModel = getClient().folder;
        }

        // Devolvemos la instancia existente
        return UserRepository.#instance;
    }

    async createFolder(data) {
        try {
            const folderCreate = await this.#folderModel.create({ data });
            return { success: true, folder: folderCreate };
        } catch (error) {
            console.error("Error creating folder:", error);
            throw new BadRequest("An error occurred while creating the folder");
        }
    }

    async getFolders(userId) {
        try {
            const folders = await this.#folderModel.findMany({
                where: {
                    ownerId: Number.parseInt(userId)
                },
                include: {
                    owner: true,
                    parentFolder: true,
                    files: true,
                    childFolders: true
                }
            });

            // Recursively get child folders for each folder
            for (const folder of folders) {
                folder.childFolders = await this.getChildFolders(userId, folder.id);
            }

            return {
                success: true,
                folders
            }

        } catch (error) {
            throw new BadRequest(error);
        }
    }

    async getChildFolders(userId, folderId) {
        try {
            const childFolders = await this.#folderModel.findMany({
                where: {
                    parentFolderId: folderId,
                    ownerId: Number.parseInt(userId)
                },
                include: {
                    owner: true,
                    parentFolder: true,
                    files: true,
                    childFolders: true
                }
            });

            // Recursively get child folders for each child folder
            for (const childFolder of childFolders) {
                childFolder.childFolders = await this.getChildFolders(userId, childFolder.id);
            }

            return childFolders;

        } catch (error) {
            throw new BadRequest(error);
        }
    }



}

// Exporta una instancia única de UserRepository en lugar de la clase
export default new UserRepository();

// for (const folder of folders) {
//     folder.childFolders = await this.getFolders(userId);
// }