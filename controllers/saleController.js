import Sale from "../models/Sale.js";

export const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.error.status(500).json({ error: error.Message });
  }
};

export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      res.status(404).json({ Message: "Sale Not Found" });
    }
    res.status(200).json({ sale });
  } catch (error) {
    if (error.id === "CastError") {
      return res.status(500).json({ Message: "Invalid Sale ID Format" });
    }
  }
};

export const createSale = async (req, res) => {
  try {
    const newSale = new Sale(req.body);
    const savedSale = await newSale.save();
    if (!newSale) {
      return res.status(404).json({ Message: "Sale Not Created" });
    }
    res.json({
      Message: "Sale Created Successfully",
      Item: savedSale,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateSale = async (req, res) => {
  try {
    const id = req.params.id;

    const saleUpdate = await Sale.findByIdAndUpdate(
      id,
      req.body.sale || req.body,
      { new: true, runValidators: true }
    );

    if (!saleUpdate) {
      return res.status(404).json({ message: "Sale not found" });
    }
    res.status(201).json({
      Message: "Sale Update Successfully",
      sale: saleUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);

    if (!sale) {
      return res.status(404).json({
        success: false,
        error: "Sale already deleted",
      });
    }

    res.json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error) {
    if (error.title === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid Sale ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete sale",
    });
  }
};
