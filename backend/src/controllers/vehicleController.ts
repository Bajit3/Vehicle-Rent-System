import { Request, Response } from "express";
import * as vehicleService from "../services/vehicleService";

export const getVehicleTypes = async (req: Request, res: Response) => {
  const wheels = parseInt(req.query.wheels as string);
  const types = await vehicleService.getTypesByWheels(wheels);
  res.json(types);
};

export const getVehiclesByType = async (req: Request, res: Response) => {
  const typeId = req.params.typeId;
  const vehicles = await vehicleService.getVehiclesByType(typeId);
  res.json(vehicles);
};
