import { parseSignup } from "../helper/normalizeData.js";
import { BadRequest } from "../middleware/errors.js";
import { UserRepository } from "../repositories/userRepository.js";



class AuthService extends UserRepository {

    constructor() {
        super();

    }

    async signup(body) {

        const save = await parseSignup(body)
        if (!save.success) throw new BadRequest(save.error);

        const users = await this.createUsers(save.user);
        if (!users.success) throw new BadRequest(users.error.message);

        const { insertedData } = users;
        return {
            success: true,
            insertedData
        }

    }




}

export default AuthService;