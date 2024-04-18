import { Router } from 'express';
import subscriptionService from '../service/subscriptionService.js';
import { BadRequest, NotFound } from '../middleware/errors.js';
import { auth } from '../middleware/auth.js';
import { authResponse, errorResponse } from '../helper/response.js';

class WebhooksRouter {
    static #instance;

    constructor() {
        if (!WebhooksRouter.#instance) {
            WebhooksRouter.#instance = this;
            this.router = Router();
            this.setupRoutes();
        }

        return WebhooksRouter.#instance;
    }

    setupRoutes() {

        this.router.post("/stripe", async (req, res) => {

            try {

                const sig = req.headers['stripe-signature'];
                const body = req.body;
                // const userId = req.headers.userid;
                // const token = req.cookies.token;
                // await auth(userId, token);

                const { success, message } = await subscriptionService.stripeWebhook(body, sig);
                // if (results) {
                //     authResponse(res, 200, true, "Webhook received", { payload: results, token});
                // }
                return res.status(success ? 200 : 400).send(message)
            } catch (error) {
                errorResponse(res, error);
            }
        });

        this.router.post("/paypal", async (req, res) => {
            // const sig = req.headers['stripe-signature'];
            console.log(req.body)
            await subscriptionService.paypalWebhook(req.body)
            console.log("PAYPAL WEBHOOK RECEIVED  >>>>> ")
            return res.status(200).send("OK")
        });
    }

    getRouter() {
        return this.router;
    }
}

export default new WebhooksRouter().getRouter();
// const fileRouterInstance = new FileRouter();
// export default fileRouterInstance.getRouter();
