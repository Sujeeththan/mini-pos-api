import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import customerRoutes from './routes/customerRoutes.js'


dotenv.config()

const app = express();
app.use(express.json());   // Middleware to parse JSON

const PORT = process.env.PORT


const connectDB = async () => {
   try {
       await mongoose
        .connect(process.env.MONGO_URI)
        .then(() => console.log('DB Connected Successfully'));
} catch (error) {
        console.log(`Error: ${error}`);
        
};

};
connectDB();

app.use('/api/customers', customerRoutes)

app.listen(PORT,() => console.log(`Server is running in http://localhost:${PORT}`));
