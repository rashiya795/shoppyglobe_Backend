import express from 'express';
import {
  getCartItems,
  addToCart,
  updateCart,
  deleteCartItem
} from '../Controllers/cart.controller.js';

const router = express.Router();

// GET all cart items for a user
router.get('/:userId', getCartItems);

// POST add a product to the cart
router.post('/', addToCart);

// PUT update quantity of a cart item by cartItem ID
router.put('/:userId', updateCart);

// DELETE a cart item by cartItem ID
router.delete('/:userId/:productId', deleteCartItem);

export default router;
