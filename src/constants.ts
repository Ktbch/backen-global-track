import { CookieOptions } from "express"


export const APP_CONTANTS = {
    authEndPoints: {
        login: '/login',
        singup: '/signup',
        logot: '/logout',
        me: '/me',
        refresh: '/refresh'
    }

}


export const cookieOption: CookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 100,
    path: "/"
}