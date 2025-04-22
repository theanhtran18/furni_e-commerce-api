import jwt from 'jsonwebtoken'
import client from './redis.js'

export const signAccessToken = async (userId, role) => {
    return new Promise((resolve, reject) => {
        const payload = {
            userId, role
        };
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1h'
        }
        jwt.sign(payload, secret, options, (error, token) => {
            if (error) reject(error)
            resolve(token)
        })
    })
}

// export const verifyAccessToken = (refreshToken) => {
//     if (!req.headers['authorization']) {
//         return next(createError.Unauthorized())
//     }
//     const authHeader = req.headers['authorization'];
//     const bearerToken = authHeader.split(' ');
//     const token = bearerToken[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
//         if (err) {
//             return next(createError.Unauthorized());
//         }
//         req.payload = payload
//         next();
//     })
// }

export const signRefreshToken = async (userId, role) => {
    const payload = { userId, role };
    const secret = process.env.REFRESH_TOKEN_SECRET;

    if (!secret) {
        throw new Error('Missing REFRESH_TOKEN_SECRET');
    }

    try {
        const token = jwt.sign(payload, secret, { expiresIn: '1y' });
        await client.setEx(userId.toString(), 365 * 24 * 60 * 60, token);
        return token;
    } catch (error) {
        throw new Error('Internal Server Error',error);
    }
};

export const verifyRefreshToken = async (refreshToken) => {
    if (!refreshToken) throw new Error("Refresh token is required");

    // Xác thực refreshToken bằng JWT
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { userId } = payload;

    // Lấy token từ Redis
    const storedToken = await client.get(userId);

    if (!storedToken) {
        throw new Error("Refresh token not found");
    }

    if (refreshToken !== storedToken) {
        throw new Error("Refresh token mismatch");
    }
    return userId;
};
