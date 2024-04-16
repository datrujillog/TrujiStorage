import Stripe from 'stripe';

import subscriptionRepository from '../repositories/subscriptionRepository.js';

import { BadRequest } from '../middleware/errors.js';
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

        // const data = {
        //     stripeSubscriptionId: subscription.id,
        //     stripeCustomerId: customerId,
        //     stripePriceId: priceId,
        //     status: subscription.status,
        // }

        return {
            success: true,
            subscription
        }
    }


    async handleCheckoutSession(session) {
        // Fulfill the purchase...
        const subscription = await subscriptionRepository.createSubscription(session.customer, session.price);

        return subscription;
    }


    async handleInvoicePaid(invoice) {
        // Add code to fulfill the purchase...
        const subscription = await subscriptionRepository.createSubscription(invoice.customer, invoice.price);

        return subscription;
    }

    async handleSubscriptionUpdated(subscription) {
        // Fulfill the purchase...
        const subscriptionn = await subscriptionRepository.createSubscription(subscription.customer, subscription.price);

        return subscription;
    }

    //////////////////

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
                    const user = await this.activateSubscription(
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




    // async stripeWebhook(data, signature) {

    //     let event
    //     try {
    //         event = stripe.webhooks.constructEvent(data, signature, endpointSecret);
    //     } catch (err) {
    //         console.log(err)
    //         return {
    //             success:false,
    //             message:err.message
    //         }
    //     }

    //     // Handle the event
    //     switch (event.type) {
    //         case 'invoice.payment_succeeded':  // es la linea invoice.payment_succeeded quiere decir que la factura fue pagada con exito 
    //             const paymentIntent = event.data.object;
    //             console.log("SUCCEEDED ",paymentIntent)
    //             break;
    //         case 'customer.subscription.updated':
    //             const subscriptionUpdated = event.data.object;
    //             // Fulfill the purchase...
    //             if (subscriptionUpdated.status === 'active') {
    //                 // handleSubscriptionUpdated(subscriptionUpdated); // es linea de codigo |
    //                 const user = await subscriptionRepository.activateSubscription(subscriptionUpdated.customer, subscriptionUpdated.id, subscriptionUpdated.type);
    //                 console.log('user', user);
    //             }
    //             break;
    //         // case 'checkout.session.completed':
    //         //     const session = event.data.object;
    //         //     console.log('session ', session);
    //         //     // Fulfill the purchase...
    //         //     // handleCheckoutSession(session);  // esta funcion lo que hace es que cuando se completa la sesion se cumple la compra
    //         //     break;
    //         // case 'invoice.paid':
    //         //     const invoice = event.data.object;
    //         //     // Add code to fulfill the purchase...
    //         //     console.log('invoice', invoice);
    //         //     // handleInvoicePaid(invoice); // esta funcion lo que hace es que cuando se paga la factura se cumple la compra 
    //         //     break;
    //         // // ... handle other event types
    //         default:
    //             // Unexpected event type
    //             console.log(`Unhandled event type ${event.type}`);
    //             return res.status(400).end();
    //     }

    //     // Return a response to acknowledge receipt of the event
    //     // res.json({ received: true });
    //     return {
    //         received: true,
    //         success: true,
    //         message: 'Webhook received'
    //     }
    // }




}

export default new SubscriptionService();
