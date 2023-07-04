
import express from 'express'
import { publicRouter } from "../routes/public";
import { ErrorMiddleware } from "../middleware/ErrorMiddleware";
import cors from "cors";

import { apiRouter } from "../routes/api";
export const web = express();
web.use(cors());
web.use(express.json({ limit: "50mb" }));
web.use(publicRouter);
web.use(apiRouter);
web.use(ErrorMiddleware);
