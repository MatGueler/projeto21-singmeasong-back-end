import { Router } from "express";

import { truncate } from "../controllers/e2eController.js";

const e2eRouter = Router();

e2eRouter.post("/e2e/reset", truncate);

export default e2eRouter;
