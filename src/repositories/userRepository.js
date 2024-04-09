import { PrismaClient } from "@prisma/client";

import { BadRequest, NotFound } from "../middleware/errors.js";


class UserRepository {
    #userModel;
    constructor() {
        this.#userModel = new PrismaClient().user;
    }

    async createUsers(data) {
        try {

            const user = await this.#userModel.create({
                data
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

    async getByEmail(email) {

        try {

            if(email === undefined) throw new BadRequest("Email is required");

            const resulEmail = await this.#userModel.findUnique({
                where: {
                    email
                }
            });

            if (!resulEmail) throw new NotFound("User not found");

            return {
                success: true,
                resulEmail 
            }

        } catch (error) {
            // return { success: false, error };
            throw new BadRequest(error);

        }
    }


}

export {
    UserRepository
}