import { eq, InferSelectModel } from "drizzle-orm";
import { db } from "../../../db";
import { shipment_items, shipments, tracking_events } from "../../../db/schema";
import { TDataToInsert, TShipmentItemsDataToInsert } from "../controller/shipment.service";


export type TShipment = InferSelectModel<typeof shipments>
export type TShipmentItems = InferSelectModel<typeof shipment_items>


export class ShipRepository {
    db: typeof db

    constructor () {
        this.db = db
    }

    async getUserShipments (userId: string) {
        return await this.db.select({ id: shipments.id, trackingNumber: shipments.tracking_number, status: shipments.status, receiverName: shipments.receiver_name, receiverCountry: shipments.receiver_country, estimatedDeliver: shipments.estimated_delivery }).from(shipments).where(eq(shipments.customer_id, userId))
    }
    async getShipmentByTrackingNumber (trackingNumber: string) {
        const shipmentDetails = await this.db.select()
            .from(shipments)
            .where(eq(shipments.tracking_number, trackingNumber))
            .leftJoin(tracking_events, eq(tracking_events.shipment_id, shipments.id))
        return shipmentDetails[ 0 ] ?? null
    }
    async createShipments (shipmentData: TDataToInsert) {
        await this.db.insert(shipments).values(shipmentData)
        const createdShipment = await this.db.select().from(shipments).where(eq(shipments.tracking_number, shipmentData.tracking_number))
        return createdShipment[ 0 ] ?? null
    }
    async createShipmentItems (shipmentItemData: TShipmentItemsDataToInsert) {
        return await this.db.insert(shipment_items).values(shipmentItemData)
    }

}