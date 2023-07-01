
import express from 'express'
import { publicRouter } from "../routes/public";
import { ErrorMiddleware } from "../middleware/ErrorMiddleware";
export const web = express();

web.use(express.json());
web.use(publicRouter);
web.use(ErrorMiddleware);
