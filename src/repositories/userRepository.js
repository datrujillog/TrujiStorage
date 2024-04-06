import UserModel from "../database/db.js";
import { BadRequest } from "../middleware/errors.js";

class UserRepository {
    #userModel;
    constructor() {
        this.#userModel = UserModel;
    }

    async createUsers(data) {
        try {

            const results = await this.#userModel.collection('users').insertMany([data]);
            if (results.acknowledged === false) throw new BadRequest("Error  al crear usuario");

            const insertedIds = results.insertedIds;
            const insertedData = Object.keys(insertedIds).map(key => ({
                _id: insertedIds[key],
                ...data
            }));

            return {
                success: true,
                insertedData
            };
            

        } catch (error) {  
            console.log(error);
            return { success: false, error: { message: error.message } };

        }


    }


}

export {
    UserRepository
}