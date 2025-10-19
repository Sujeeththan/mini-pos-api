import express from "express";
import connectDB from "./config/db.js";
import customerRouter from "./routes/customerRoutes.js";
import itemRouter from "./routes/itemRoutes.js";
import saleRouter from "./routes/saleRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON

app.get("/", (req, res) => {
  res.send("Mini-pos-api work successful");
});
const PORT = process.env.PORT;

connectDB();

app.use("/api/customers", customerRouter);
app.use("/api/items", itemRouter);
app.use("/api/sales", saleRouter);
app.use("/api/users", authRoutes);

app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`)
);
