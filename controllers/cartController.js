import Cart from "../models/Cart.js";
import Products from "../models/Products.js";

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user._id;

  if (!productId) {
    return res.status(400).json("productId is required");
  }
  try {
    const product = await Products.findById(productId);
    if (!product) {
        return res.status(500).json("product not found");
    }
  } catch (error) {
    return res.status(500).json("product not found");
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ productId, quantity: 1 });
      }
      await cart.save();
      return res.status(200).json(cart);
    } else {
      const cart = await Cart.create({
        userId,
        products: [{ productId, quantity: 1 }],
      });
      return res.status(201).json(cart);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateQuantity = async (req, res) => {
  const { productId, qty } = req.body;
  const userId = req.user._id;
  if (!productId) {
    return res.status(400).json("productId is required");
  } else if (!qty) {
    return res.status(400).json("quantity is required");
  }else if(qty<1){
    return res.status(400).json("quantity must be greater than 0");

  }

  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.productId.toString() === productId);

      if (productIndex > -1) {
       
        cart.products[productIndex].quantity = qty;
        await cart.save();
        return res.status(200).json(cart);
      } else {
        return res.status(404).json("Product not found in cart");
      }
    } else {
      return res.status(404).json("Cart not found");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

export const getCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json("Cart not found");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
}