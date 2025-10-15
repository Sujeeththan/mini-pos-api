import express from 'express';

import { getAllCustomers,
         getCustomerById,
         createCustomer
         

       } from '../controllers/customerController.js';

const router = express.Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
router.get('/', createCustomer);
// router.get('/:id', updateCustomer);
// router.get('/:id', deleteCustomer);

export default router;