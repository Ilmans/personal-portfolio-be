
import express from 'express'
import { publicRouter } from "../routes/public";
import { ErrorMiddleware } from "../middleware/ErrorMiddleware";
import { apiRouter } from "../routes/api";
import cors from "cors";
export const web = express();

const corsOptions = {
  origin: "http://localhost:3001", // Ganti dengan URL yang diizinkan
  optionsSuccessStatus: 200, // Beberapa browser memerlukan opsi ini
};
web.use(cors(corsOptions));

web.use(express.static("public/"));
web.get("/projects/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(`${__dirname}/public/projects/${imageName}`);
});

web.use(express.json({ limit: "50mb" }));
web.use(publicRouter);
web.use(apiRouter);
web.use(ErrorMiddleware);
