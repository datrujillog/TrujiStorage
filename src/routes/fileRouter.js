import upload from '../middleware/upload.js';
import busboy from 'busboy';
import { createReadStream, createWriteStream } from 'fs';

import { Router } from 'express';
import FilesService from '../service/fileService.js';
import { errorResponse } from '../helper/response.js';

function fileRouter(app) {
    const router = Router();

    const filesServ = new FilesService()

    app.use("/api/v1/files", router)

    //! controlar el error cuando no existe un archivo a borrar

    router.get("/:fileName", async (req, res) => {
        const { fileName } = req.params;

        try {
            const result = await filesServ.download(fileName);

            if (result.success) {
                result.data.pipe(res);

                result.data.on("error", (error) => {
                    console.log("Error:", error);
                    return res.status(500).json({ message: "Error al descargar el archivo" });
                });

                result.data.on("end", () => {
                    console.log("Finished");
                });

            } else {
                return res.status(404).json({ message: "El archivo no se encontró" });
            }
        } catch (error) {
            // Verificar si el error es NoSuchKey
            console.error("Error al descargar el archivo:", error);
            return res.status(500).json({ message: "Error al descargar el archivo" });
        }
    });



    router.post("/files-upload", upload.array("files"), async (req, res) => {

        try {
            const file = req.file;
            const fileName = file.originalname;
            // const body = req.body.id;

            const result = await filesServ.upload(fileName, file.buffer);

            if (result.success) {
                return res.status(201).json(result);
            } else {
                return res.status(400).json(result);
            }

            

        } catch (error) {
            console.error('Error uploading file:', error);
            // res.status(500).json({ success: false, message: "An error occurred while uploading the file" });
            errorResponse(res, error)
        }


    });
    router.delete("/:fileName", async (req, res) => {
        const { fileName } = req.params

        const result = await filesServ.delete(fileName)

        if (result.success) {
            return res.status(200).json(result)
        } else {
            return res.status(400).json(result)
        }
    })



}

export default fileRouter