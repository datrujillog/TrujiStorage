import { Router } from 'express';
import filesService from '../service/fileService.js';
import uploadFile from '../middleware/upload.js';
import { BadRequest, NotFound } from '../middleware/errors.js';
import { auth } from '../middleware/auth.js';
import { errorResponse } from '../helper/response.js';

class FileRouter {
    static #instance;

    constructor() {
        if (!FileRouter.#instance) {
            FileRouter.#instance = this;
            this.router = Router();
            this.setupRoutes();
        }

        return FileRouter.#instance;
    }

    setupRoutes() {

        this.router.post("/upload", uploadFile.array('files'), async (req, res) => {
            try {
                const userId = req.headers.userid;
                const token = req.cookies.token;
                await auth(userId, token);
                const results = await filesService.uploadMany(req.files, userId);
                if (!results) {
                    return errorResponse(res, { message: "An error occurred while uploading the file" });
                }
                res.status(200).json({ results });
            } catch (error) {
                console.error('Error uploading file:', error);
                errorResponse(res, error);
            }
        });

        this.router.get("/download/:fileName", async (req, res) => {
            try {
                const { fileName } = req.params;
                const userId = req.headers.userid;
                const token = req.cookies.token;
                await auth(userId, token);
                const result = await filesService.download(fileName, res);
                if (result.success === false) {
                    throw new NotFound(result.message);
                }
                res.end();
            } catch (error) {
                return errorResponse(res, error);
            }
        });

        this.router.delete("/delete/", async (req, res) => {
            try {
                const files = req.body
                const userId = req.headers.userid;
                const token = req.cookies.token;
                await auth(userId, token);
                const result = await filesService.deleteFile(files);
                const { deleteFele } = result;
                if (!result.success) throw new BadRequest(deleteFele.error);
                res.status(200).json({ success: true, result });
            } catch (error) {
                errorResponse(res, error);
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new FileRouter().getRouter();
// const fileRouterInstance = new FileRouter();
// export default fileRouterInstance.getRouter();
