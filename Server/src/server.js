import express from "express";
import router from "./routes/index.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

import cors from "cors";

app.use(cors());

app.use(express.json());
const PORT = process.env.PORT || 5000;

router(app);

app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
