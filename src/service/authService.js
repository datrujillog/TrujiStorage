
import { BadRequest } from "../middleware/errors.js";

import { UserRepository } from "../repositories/userRepository.js";

import { compare, encrypt } from "../libs/bcrypt.js";
import { createToken } from "../libs/jwt.js";

import { parseSignup } from "../helper/normalizeData.js";



class AuthService extends UserRepository {

    constructor() {
        super();

    }

    async login(data) {

        const { email, password } = data;
        const results = await this.getByEmail(email);

        const { resulEmail } = results;
        await compare(password, results.resulEmail.password)
        const token = await createToken(resulEmail);

        return {
            success: true,
            user: resulEmail,
            token
        };
    }

    async signup(body) {

        if (body.password) body.password = await encrypt(body.password);

        const save = await parseSignup(body)
        if (!save.success) throw new BadRequest(save.error);

        const users = await this.createUsers(save.user);
        if (!users.success) throw new BadRequest(users.error.message);

        const { user } = users;
        return {
            success: true,
            user
        }

    }




}

export default AuthService;