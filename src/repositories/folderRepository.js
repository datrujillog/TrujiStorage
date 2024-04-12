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

    async createFolder(userId, data) {

        try {
            if (!data.name) {
                throw new BadRequest("Data is required");
            }
            const folderCreate = await this.#folderModel.create({
                data: {
                    name: data.name,
                    owner: {
                        connect: {
                            id: Number.parseInt(userId)
                        }

                    }
                }
            });

            return {
                success: true,
                folder: folderCreate
            };

        } catch (error) {
            console.log(error);
            throw new BadRequest(error);
            // return { success: false, error };
        }
    }

    async getFolders(userId) {
        try {
            const folders = await this.#folderModel.findMany({
                where: {
                    ownerId: Number.parseInt(userId)
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

