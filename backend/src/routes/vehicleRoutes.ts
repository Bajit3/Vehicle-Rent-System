import express from "express";
import { getVehicleTypes, getVehiclesByType } from "../controllers/vehicleController";

const router = express.Router();
router.get("/types", getVehicleTypes);
router.get("/:typeId", getVehiclesByType);
export default router;
