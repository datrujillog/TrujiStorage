import { Router } from 'express';
import folderService from '../service/folderService.js';
import { BadRequest, NotFound } from '../middleware/errors.js';
import { auth } from '../middleware/auth.js';
import { authResponse, errorResponse } from '../helper/response.js';

class FolderRouter {
    static #instance;

    constructor() {
        if (!FolderRouter.#instance) {
            FolderRouter.#instance = this;
            this.router = Router();
            this.setupRoutes();
        }

        return FolderRouter.#instance;
    }

    setupRoutes() {

        this.router.post("/create", async (req, res) => {

            try {

                const { ownerId, name, parentFolderId } = req.body
                const userId = req.headers.userid;
                const token = req.cookies.token;
                await auth(userId, token);
                const response = await folderService.createFolder(ownerId, name, parentFolderId);
                const { success, folder } = response;
                if (response) {
                    authResponse(res, 201, true, "Folder created", { payload: folder, token });
                }

            } catch (error) {
                console.error('Error uploading file:', error);
                errorResponse(res, error);
            }

        });

        this.router.get("/list", async (req, res) => {

            try {

                const userId = req.headers.userid;
                const token = req.cookies.token;
                await auth(userId, token);
                const response = await folderService.getFolders(userId);
                const { success, folders } = response;
                if (response) {
                    authResponse(res, 200, true, "Folders", { payload: folders, token });
                }

            } catch (error) {
                errorResponse(res, error.message);
            }
        });

        this.router.get("/One/:nameFolders", async (req, res) => {

            try {

                const userId = req.headers.userid;
                const token = req.cookies.token;
                const { nameFolders } = req.params;
                await auth(userId, token);
                const response = await folderService.getFindByFolders(userId, nameFolders);
                const { success, folders } = response;
                if (response) {
                    authResponse(res, 200, true, "Folders", { payload: folders, token });
                }

            } catch (error) {
                errorResponse(res, error.message);
            }
        });


        this.router.delete("/", async (req, res) => {
            try {

            } catch (error) {
                errorResponse(res, error);
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new FolderRouter().getRouter();
// const fileRouterInstance = new FileRouter();
// export default fileRouterInstance.getRouter();
