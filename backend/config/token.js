import jwt from 'jsonwebtoken';

export const genToken = async(userId) => {
    try {
        let token = await jwt.sign({ id: userId }, process.env.JWT_SECRET, {expiresIn:"7d"})
        return token; // return the generated token
    } catch (error) {
        console.log("token error")
    }
}