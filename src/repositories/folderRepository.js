import { PrismaClient } from "@prisma/client";
import { BadRequest, NotFound } from "../middleware/errors.js";
import getClient from "../libs/db.js";

class UserRepository {
    static #instance; // Propiedad estática para almacenar la única instancia

    #folderModel;

    constructor() {
        // Verificamos si ya hay una instancia creada
        if (!UserRepository.#instance) {
            // Si no hay una instancia, creamos una nueva y la asignamos a la propiedad estática
            UserRepository.#instance = this;
            // this.#userModel = new PrismaClient().user;
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
                    // files: true,
                    childFolders: {
                        include: {
                            childFolders: true
                        }
                    }
                }
            });

            return {
                success: true,
                folders
            }

        } catch (error) {
            throw new BadRequest(error);
        }
    }


}

// Exporta una instancia única de UserRepository en lugar de la clase
export default new UserRepository();

