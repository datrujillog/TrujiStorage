import { Router } from 'express';
import subscriptionService from '../service/subscriptionService.js';
import { BadRequest, NotFound } from '../middleware/errors.js';
import { auth } from '../middleware/auth.js';
import { authResponse, errorResponse } from '../helper/response.js';

class SubscriptionsRouter {
    static #instance;

    constructor() {
        if (!SubscriptionsRouter.#instance) {
            SubscriptionsRouter.#instance = this;
            this.router = Router();
            this.setupRoutes();
        }

        return SubscriptionsRouter.#instance;
    }

    setupRoutes() {

        this.router.post("/create", async (req, res) => {

            try {

                const {customerId, priceId} = req.body 
                // const userId = req.headers.userid;
                const token = req.cookies.token; 
                // await auth(userId, token);
                const response = await subscriptionService.createSubscription(customerId, priceId);
                const { success, subscription } = response;
                if (!success) errorResponse(res, subscription);

                authResponse(res, 201, true, "Subscription created", { payload: subscription, token });

            } catch (error) {
                errorResponse(res, error);
            }
        });

        this.router.get("/", async (req, res) => {

            // try {

            const userId = req.headers.userid;
            const token = req.cookies.token;
            await auth(userId, token);
            // const response = await folderService.getFolders(userId);
            const { success, folders } = response;
            if (response) authResponse(res, 200, true, "Subscription", { payload: folders, token });
            errorResponse(res, error.message);

            // } catch (error) {
            //     errorResponse(res, error.message);
            // }
        });

        this.router.get("/", async (req, res) => {

            try {

                const userId = req.headers.userid;
                const token = req.cookies.token;
                const { folderId } = req.params;
                await auth(userId, token);
                // const response = await folderService.getFindByFolders(userId, folderId);  
                const { success, folders } = response;
                if (response) {
                    authResponse(res, 200, true, "Subscription", { payload: folders, token });
                    // res.json({ success, folders});
                }

            } catch (error) {
                errorResponse(res, error.message);
            }
        });


        this.router.delete("", async (req, res) => {
            try {

                const userId = req.headers.userid;
                const token = req.cookies.token;
                const { folderId } = req.params;
                await auth(userId, token);
                // const response = await folderService.deleteFolder(userId, folderId);
                const { success, folder } = response;
                if (response) {
                    authResponse(res, 200, true, "Subscription deleted", { payload: folder, token });
                }

            } catch (error) {
                errorResponse(res, error);
            }
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new SubscriptionsRouter().getRouter();
// const fileRouterInstance = new FileRouter();
// export default fileRouterInstance.getRouter();
