import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.error.status(500).json({ error: error.Message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ Message: "User Not Found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    if (error.id === "CastError") {
      return res.status(500).json({ Message: "Invalid User ID Format" });
    }
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    if (!newUser) {
      return res.status(404).json({ Message: "User Not Created" });
    }
    res.json({
      Message: "User Created Successfully",
      User: savedUser,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ Message: "User Not Update" });
    }

    const userUpdate = await User.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      Message: "User Update Successfully",
      user: updateUser,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User already deleted",
      });
    }

    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error.title === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid User ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete user",
    });
  }
};
