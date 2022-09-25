import { Request, Response } from "express";
import { reset } from "../services/e2eService.js";

export async function truncate(req: Request, res: Response) {
  await reset();
  res.sendStatus(200);
}
