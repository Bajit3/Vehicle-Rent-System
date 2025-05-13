import { Request, Response } from "express";
import * as bookingService from "../services/bookingService";
import { CreateBookingDTO } from "../dtos/CreateBookingDTO";

export const createBooking = async (req: Request, res: Response) => {
  const data: CreateBookingDTO = req.body;
  const result = await bookingService.createBooking(data);
  res.status(201).json(result);
};
