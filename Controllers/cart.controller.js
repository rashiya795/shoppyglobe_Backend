import Cart from '../Models/cart.model.js';
import Product from '../Models/product.model.js';

// Get all cart items for a user
export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ message: 'Cart is empty' });
    }

    res.status(200).json(cart.items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If no cart exists, create one
      cart = new Cart({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // Check if product already exists in cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // If found, update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Else, push new item
        cart.items.push({ productId, quantity });
      }
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update quantity of a cart item
export const updateCart = async (req, res) => {
  try {

const { productId, quantity } = req.body;
const userId = req.params.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.quantity = quantity;
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a cart item
export const deleteCartItem = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
