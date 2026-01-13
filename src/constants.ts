import { CookieOptions } from "express"


export const BASE_URL = "/global-tracker/api/v1"

export const APP_CONTANTS = {
    authEndPoints: {
        login: '/auth/login',
        singup: '/auth/signup',
        logout: '/auth/logout',
        me: '/auth/me',
        refresh: '/auth/refresh'
    },
    userEndPoints: {
        profileDetails: '/profile'
    },
    shipmentEndPoints: {
        shipment: '/shipment',
        createShipments: '/shipment/create-shipment',
        createShipmentItems: '/shipment/create-shipment-items'
    }

}


export const cookieOption: CookieOptions = {
    httpOnly: true,
    secure: false,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 100,
    path: "/"
}