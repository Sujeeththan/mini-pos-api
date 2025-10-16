import express from "express";
import customerRouter from "./routes/customerRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import connectDB from "./config/db.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = 3000;

connectDB();

app.use("/api/customers", customerRouter);
app.use("/api/items", itemRouter);

app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`)
);
