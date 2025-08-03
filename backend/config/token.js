import jwt from 'jsonwebtoken';

export const genToken = async (userId) => {
    try {
        let token = await jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: '30d',
        });
        return token;
    } catch (error) {
        console.log("Error generating token:", error);
    }
}