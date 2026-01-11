import jwt from 'jsonwebtoken'
import AppConfig from '../config.ts/config'
import crypto from 'crypto'

export const jwtHandler = {
    generateToken: (id: string) => {
        const accessToken = jwt.sign({ id }, AppConfig.ACCESS_SECRET, { expiresIn: '15m' })
        const refreshToken = jwt.sign({ id }, AppConfig.REFRESH_SECRET, { expiresIn: '7d', algorithm: "HS384" })
        return { refreshToken, accessToken }
    },
    verify: (token: string, type: 'access' | 'refresh') => {
        const secret = type === 'access' ? AppConfig.ACCESS_SECRET : AppConfig.REFRESH_SECRET;
        const decoded = jwt.verify(token, secret);
        return decoded;
    },
    generateRefreshToken: () => {
        return crypto.randomBytes(64).toString('hex')
    },
    hashToken (token: string) {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}