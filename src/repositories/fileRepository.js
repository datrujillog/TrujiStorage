import { PrismaClient } from "@prisma/client";

import { BadRequest, NotFound } from "../middleware/errors.js";
import upload from "../middleware/upload.js";


class FileRepository {
    #fileModel;
    constructor() {
        this.#fileModel = new PrismaClient().file;
    }
    //! Método para subir archivos falta revisar  el userId 
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

    async findFileById(fileName) {

        try {

            const file = await this.#fileModel.findMany({
                where: {
                    name: fileName
                }
            });

            if (file.length === 0) throw new NotFound(" File not found");


            return {
                success: true,
                file
            }

        } catch (error) {

            return { success: false, error };
        }
    }


    async deleteFile(fileName) {
        try {

            const cleanedFileName = fileName.replace('uploads/', '');

            const file = await this.#fileModel.deleteMany({ where: { name: cleanedFileName } })
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


export default FileRepository;