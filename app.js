import express from "express";
import connectDB from "./config/db.js";
import customerRouter from "./routes/customerRoutes.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON

const PORT = 3000;

connectDB();

app.use("/api/customers", customerRouter);

app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`)
);
