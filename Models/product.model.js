import mongoose from "mongoose";

const {Schema} = mongoose


const productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
