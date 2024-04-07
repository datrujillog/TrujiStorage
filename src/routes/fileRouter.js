import upload from '../middleware/upload.js';
import busboy from 'busboy';
import { createReadStream, createWriteStream } from 'fs';

import { Router } from 'express';
import FilesService from '../service/fileService.js';

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
                if (result.data) { 
                    result.data.pipe(res);

                    result.data.on("error", (error) => {
                        console.log("Error:", error);
                        return res.status(500).json({ message: "Error al descargar el archivo" });
                    });

                    result.data.on("end", () => {
                        console.log("Finished");
                    });
                } else {
                    console.error("Error: No se pudo obtener el flujo de datos del archivo");
                    return res.status(500).json({ message: "Error al descargar el archivo" });
                }
            } else {
                return res.status(404).json({ message: "El archivo no se encontró" });
            }
        } catch (error) {
            // Verificar si el error es NoSuchKey
            if (error.code === "NoSuchKey") {
                return res.status(404).json({ message: "El archivo no se encontró" });
            } else {
                // Manejar otros errores
                console.error("Error al descargar el archivo:", error);
                return res.status(500).json({ message: "Error al descargar el archivo" });
            }
        }
    });



    router.post("/upload", async (req, res) => {
        const bb = busboy({ headers: req.headers });

        bb.on('file', async (name, file, info) => {
            try {
                const { filename } = info;
                const result = await filesServ.upload(filename, file);
                res.status(200).json(result);
            } catch (error) {
                console.error('Error uploading file:', error);
                res.status(500).json({ success: false, message: "An error occurred while uploading the file" });
            }
        });

        bb.on('finish', () => {
            console.log('All files uploaded successfully');
        });

        bb.on('error', (error) => {
            console.error('Error parsing form:', error);
            res.status(500).json({ success: false, message: "An error occurred while parsing the form" });
        });

        req.pipe(bb);
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