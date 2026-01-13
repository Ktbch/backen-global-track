import { Router } from "express";
import { APP_CONTANTS } from "../../../constants";
import { authGuard } from "../../../middleware/authrorization/auth-guard.middleware";
import { ShipController } from "../controller/shipment.controller";

export const shipmentRoute = Router()

const shipmentController = new ShipController()

shipmentRoute.get(APP_CONTANTS.shipmentEndPoints.shipment, authGuard, shipmentController.handleGetUserShipment)
shipmentRoute.post(APP_CONTANTS.shipmentEndPoints.createShipments, authGuard, shipmentController.handleCreateShipment)
shipmentRoute.post(APP_CONTANTS.shipmentEndPoints.createShipmentItems, authGuard, shipmentController.handleCreateShipmentItem)


