import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import productRoutes from './Routes/product.routes.js';
import cartRoutes from './Routes/cart.routes.js'
import authRoutes from './Routes/auth.routes.js'



dotenv.config();

let app = express()
let port = 3000

//Middleware
app.use(express.json())

//Routes
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/auth',authRoutes);

//Mongodb connection
mongoose.connect(process.env.MONGO_URI)

  .then(() => {
    console.log("database is successfully connected");
  })
  .catch((err) => {
    console.log(err);
  });


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})

