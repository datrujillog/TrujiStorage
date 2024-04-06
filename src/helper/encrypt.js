
import bcrypt from 'bcrypt';


export const encryptPassword = async (string) => {
    try {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(string, salt);

        return hash;
    } catch (error) {
        console.log(error);
    }
};


export const comparePassword = async (string, hash) => {
    const match = await bcrypt.compare(string, hash);
    if (!match) {
        throw new Error("Invalid password");
    }
    return match;
}