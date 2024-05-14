
import jwt from "jsonwebtoken";
import env from "../config/env.js";

export async function createToken(string) {

    try {
        const token = await jwt.sign({
            userId: string.id,
            //  string
         }, env.JWT_SECRET, { expiresIn: "1h" });
         
        return token;

    } catch (error) {
        console.error(error);
        throw new BadRequest(error);
    }
}