// import Customer from "../models/Customer.js"

export const getAllCustomers = async (req,res) => {
    try {
        const customers = await Customer.find()
        res.status(200).json(customers)
    } catch (error) {
        res.error.status(500).json({error:error.Message})
    }
};

export const getCustomerById = async (req,res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        if(!customer){
             res.status(404).json({Message:'Customer Not Found'})
            }
           res.status(200).json({customer})
    } catch (error) {
        if(error.id === 'CastError') {
   return  res.status(500).json({Message:'Invalid Customor ID Format'})
        }
    }
};

export const createCustomer = async (req,res) => {
    try {
        const newCustomer = new Customer(req.body)
        const savedCustomer = await newCustomer.save()
        if(!newCustomer) {
            return res.status(404).json({Message:"Customer Not Created"})
        }
        res.json({Message:"Customer Created Successfully", customer:savedCustomer})
    } catch (error) {
         res.status(500).json({error:error})
    }
};

