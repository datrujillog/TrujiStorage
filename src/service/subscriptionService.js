import Stripe from 'stripe';

import subscriptionRepository from '../repositories/subscriptionRepository.js';
import { BadRequest } from '../middleware/errors.js';
import paypalClient from '../libs/paypalClient.js';
import env from '../config/env.js';

const stripe = new Stripe(env.STRIPE_PUBLIC_KEY);

const endpointSecret = "whsec_4e6386e8cc6542e53ec006d020f13f91e8953ed5d8c7b33b31ec2f5e69933976";


class SubscriptionService {
    static #instance;

    constructor() {
        if (!SubscriptionService.#instance) {
            SubscriptionService.#instance = this;
        }

        return SubscriptionService.#instance;
    }

    async createSubscription(customerId, priceId) {

        const subscription = await subscriptionRepository.createSubscription(customerId, priceId);

        return {
            success: true,
            subscription
        }
    }



    async createSubscriptionPayPal(idUser, planID) {

        try {
            const params = new url.URLSearchParams({
                grant_type: "client_credentials"
            })
            console.log(params.toString())
            const { data: { access_token } } = await paypalClient.post("/v1/oauth2/token", "grant_type=client_credentials", {
                auth: {
                    username: paypalPublicKey,
                    password: paypalSecretKey
                }
            })
            const response = await paypalClient.post("/v1/billing/subscriptions", {
                'plan_id': planID
            }, {
                headers: {
                    "Authorization": "Bearer " + access_token
                }
            })
            const subscription = response.data
            console.log(subscription)
            const result = await client.subscription.update({
                where: {
                    userID: idUser
                },
                data: {
                    paypalSubscriptionId: subscription.id
                }
            })

            return {
                success: true,
                subscription
            }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                message: "Ocurrió un error, intenta mas tarde"
            }
        }
    }


    async stripeWebhook(data, signature) {
        let event
        try {
            event = stripe.webhooks.constructEvent(data, signature, endpointSecret);
        } catch (err) {
            console.log(err)
            return {
                success: false,
                message: err.message
            }
        }

        switch (event.type) {
            case 'invoice.payment_succeeded':
                const paymentIntent = event.data.object;
                console.log(paymentIntent)
                break;
            case 'payment_intent.succeeded':
                const payment = event.data.object;
                console.log(payment)
                break;
            case 'customer.subscription.updated':
                const subscriptionUpdated = event.data.object
                if (subscriptionUpdated.status === "active") {
                    const user = await subscriptionRepository.activateSubscription(
                        subscriptionUpdated.customer,
                        subscriptionUpdated.id
                    )
                    console.log(user)
                }
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }


        return {
            success: true,
            message: "OK"
        }

    }

    async paypalWebhook(data) {
        switch (data.event_type) {
            case 'BILLING.SUBSCRIPTION.ACTIVATED':
                console.log(data.resource.status)
                if (data.resource.status === "ACTIVE") {
                    const user = await subscriptionRepository.activateSubscriptionPayPal(
                        data.resource.id
                    )
                }
                break;

            default:
                console.log(`Unhandled event type ${data.event_type}`);
                break;
        }
    }

}

export default new SubscriptionService();
