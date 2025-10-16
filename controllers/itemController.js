import Item from "../models/Item.js";

export const getAllItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.error.status(500).json({ error: error.Message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      res.status(404).json({ Message: "Item Not Found" });
    }
    res.status(200).json({ item });
  } catch (error) {
    if (error.id === "CastError") {
      return res.status(500).json({ Message: "Invalid Item ID Format" });
    }
  }
};

export const createItem = async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    if (!newItem) {
      return res.status(404).json({ Message: "Item Not Created" });
    }
    res.json({
      Message: "Item Created Successfully",
      Item: savedItem,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await Item.findOne({ _id: id });
    if (!item) {
      return res.status(404).json({ Message: "Item Not Update" });
    }

    const itemUpdate = await Item.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      Message: "Item Update Successfully",
      item: itemUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        error: "Item already deleted",
      });
    }

    res.json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    if (error.title === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid Item ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete item",
    });
  }
};
