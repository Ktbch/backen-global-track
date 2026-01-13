import z, { boolean, email, string } from "zod";
import { shipmentStatus } from "../db/schema";






export const createShipmentSchema = z.object({
    senderName: z.string(),
    senderPhone: z.string(),
    senderEmail: z.email(),
    senderAddress: z.string(),
    senderCity: z.string(),
    receiverName: z.string(),
    receiverPhone: z.string(),
    receiverEmail: z.email(),
    receiverAddress: z.string(),
    receiverCity: z.string(),
    totalWeightKg: z.number(),
    declaredValueNg: z.number(),
    shipCostNg: z.number(),
    insuranceCost: z.number(),
    totalCostNg: z.number(),
    isFragile: z.boolean(),
    requiresInsurance: z.boolean(),
    specialInstrinction: z.string().nullable(),
    status: z.enum(shipmentStatus)
})

const ShipmentItemSchema = z.object({
    shipmentId: z.string(),
    description: z.string(),
    quantity: z.number(),
    weightKg: z.number(),
    declaredValueNgn: z.number(),
})

export const ListOFShipmentSchema = z.array(ShipmentItemSchema)


export const authSchema = z.object({
    email: z.email({ error: "Invalid email" }),
    password: z.string().min(3).max(10),
})

export const createAccountSchema = authSchema.extend({
    fullName: z.string()
})



export type AuthDto = z.infer<typeof authSchema>
export type createAccountDto = z.infer<typeof createAccountSchema>
export type createShipmentDto = z.infer<typeof createShipmentSchema>
export type createShipmentItemsDto = z.infer<typeof ListOFShipmentSchema>
export type shipmentItemDto = z.infer<typeof ShipmentItemSchema>