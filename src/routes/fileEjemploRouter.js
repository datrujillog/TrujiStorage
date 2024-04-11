import { Router } from 'express';
import fileUpload from 'express-fileupload';
import FilesService from '../service/fileService.js';
import { errorResponse } from '../helper/response.js';
import { downloadFile, getFile, getFiles, getFileURL, uploadFile } from '../libs/Ejemplostorage.js';

class FileEjemploRouter {
    static #instance;

    constructor() {
        if (!FileEjemploRouter.#instance) {
            FileEjemploRouter.#instance = this;
            this.router = Router();
            this.setupRoutes();
        }

        return FileEjemploRouter.#instance;
    }

    setupRoutes() {

        this.router.use("/api/v1/filesEjemplo", fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/'  
        }));

        this.router.post("/files-upload", async (req, res) => {
            try {
                const result = await uploadFile(req.files.files);
                res.json(result);
            } catch (error) {
                console.error('Error uploading file:', error);
                errorResponse(res, error);
            }
        });

        this.router.get("/getFiles", async (req, res) => {
            try {
                const result = await getFiles();
                res.json(result.Contents);
            } catch (error) {
                console.error('Error getting files:', error);
                errorResponse(res, error);
            }
        });

        this.router.get("/upload/:fileName", async (req, res) => {
            try {
                const result = await getFile(req.params.fileName);
                res.status(200).json({
                    ContentType: result.ContentType,
                    ContentLength: result.ContentLength,
                    Etag: result.ETag,
                    metadata: result.$metadata,
                });
            } catch (error) {
                console.error('Error getting file:', error);
                errorResponse(res, error);
            }
        });

        this.router.get("/download/:fileName", async (req, res) => {
            try {
                const result = await downloadFile(req.params.fileName);
                res.json({
                    message: "File downloaded successfully",
                    result
                });
            } catch (error) {
                console.error('Error downloading file:', error);
                errorResponse(res, error);
            }
        });

        this.router.get("/url/file/:fileName", async (req, res) => {
            try {
                const result = await getFileURL(req.params.fileName);
                res.json({ url: result });
            } catch (error) {
                console.error('Error downloading file:', error);
                errorResponse(res, error);
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new FileEjemploRouter().getRouter();
