import { PrismaClient } from "@prisma/client";

import { BadRequest, NotFound } from "../middleware/errors.js";


class FileRepository {
    #fileModel;
    constructor() {
        this.#fileModel = new PrismaClient().file;
    }

    async createfileName(data) {
        try {
            const userId = 2
            const user = await this.#fileModel.create({
                data: {
                    originalName: data.originalName,
                    // name: data.fileName
                    name: data.fileName,
                    ownerId: userId
                },
                
                
            });
 
            return {
                success: true,
                user
            }


        } catch (error) {
            console.log(error);
            return { success: false, error: { message: error.message } };

        }


    }
}

export default FileRepository;