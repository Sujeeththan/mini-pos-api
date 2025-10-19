import express from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.get("/", getAllUsers);
authRoutes.get("/:id", getUserById);
authRoutes.post("/", createUser);
authRoutes.put("/:id", updateUser);
authRoutes.delete("/:id", deleteUser);

export default authRoutes;
