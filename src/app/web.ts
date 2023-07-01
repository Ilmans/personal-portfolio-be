
import express from 'express'
import { publicRouter } from "../routes/public";
import { ErrorMiddleware } from "../middleware/ErrorMiddleware";
import cors from "cors";
export const web = express();

web.use(cors());
web.use(express.json());
web.use(publicRouter);
web.use(ErrorMiddleware);
