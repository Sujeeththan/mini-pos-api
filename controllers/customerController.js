import Customer from "../models/Customer.js";

export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.error.status(500).json({ error: error.Message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      res.status(404).json({ Message: "Customer Not Found" });
    }
    res.status(200).json({ customer });
  } catch (error) {
    if (error.id === "CastError") {
      return res.status(500).json({ Message: "Invalid Customor ID Format" });
    }
  }
};

export const createCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const savedCustomer = await newCustomer.save();
    if (!newCustomer) {
      return res.status(404).json({ Message: "Customer Not Created" });
    }
    res.json({
      Message: "Customer Created Successfully",
      customer: savedCustomer,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await Customer.findOne({ _id: id });
    if (!customer) {
      return res.status(404).json({ Message: "Customer Not Update" });
    }

    const customerUpdate = await Customer.findByIdAndUpdate(id, req.body);
    res.status(201).json({
      Message: "Customer Update Successfully",
      customer: customerUpdate,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: "Customer already deleted",
      });
    }

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    if (error.title === "CastError") {
      return res.status(400).json({
        success: false,
        error: "Invalid Customer ID format",
      });
    }
    res.status(500).json({
      success: false,
      error: "Failed to delete customer",
    });
  }
};
