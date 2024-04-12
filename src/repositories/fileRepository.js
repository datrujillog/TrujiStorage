// import { PrismaClient } from "@prisma/client";
import { BadRequest, NotFound } from "../middleware/errors.js";
import getClient from "../libs/db.js";

class FileRepository {
    static #instance;

    #fileModel;

    constructor() {
        if (!FileRepository.#instance) {
            FileRepository.#instance = this;
            this.#fileModel = new getClient().file;
        }

        return FileRepository.#instance;
    }

    async createFile(data, userId) {
        try {
            const user = await this.#fileModel.create({
                data: {
                    originalName: data.originalName,
                    name: data.fileName,
                    owner: {
                        connect: {
                            id: Number.parseInt(userId)
                        }
                    
                    }
                }
            });

            return {
                success: true,
                user
            };
        } catch (error) {
            console.log(error);
            return { success: false, error: { message: error.message } };
        }
    }

    async findFileByName(fileName) {
        try {
            const file = await this.#fileModel.findMany({
                where: {
                    name: fileName
                }
            });

            if (file.length === 0) throw new NotFound("File not found");

            return {
                success: true,
                file
            };
        } catch (error) {
            return { success: false, error };
        }
    }

    async deleteMany(fileName) {
        try {
            const cleanedFileName = fileName.replace('uploads/', '');
            const file = await this.#fileModel.deleteMany({ where: { name: cleanedFileName } });

            if (file.count === 0) throw new NotFound("File not found");

            return {
                success: true,
                message: 'File deleted successfully'
            };
        } catch (error) {
            return {
                success: false,
                error: { message: error.message }
            };
        }
    }
}

export default new FileRepository();
