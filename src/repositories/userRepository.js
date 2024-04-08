import { PrismaClient } from "@prisma/client";

import { BadRequest } from "../middleware/errors.js";


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


}

export {
    UserRepository
}