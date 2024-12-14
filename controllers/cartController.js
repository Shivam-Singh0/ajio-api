
import Stripe from "stripe";
import Cart from "../models/Cart.js";
import Products from "../models/Products.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const addToCart = async (req, res) => {
  const { id, title, price, image } = req.body;
  

  const userId = req.user.uid;

  

  if (!id) {
    return res.status(400).json("productId is required");
  }
  try {
    const product = await Products.findById(id);
    
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
        (p) => p.id.toString() === id
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ id,title, price, image, quantity: 1  });
      }
      await cart.save();
      return res.status(200).json(cart);
    } else {
      const cart = await Cart.create({
        userId,
        products: [{ id,title, price, image, quantity: 1 }],
      });
      return res.status(201).json(cart);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  console.log(productId, quantity)
  const userId = req.user.uid;
  if (!productId) {
    return res.status(400).json("productId is required");
  } else if (!quantity) {
    return res.status(400).json("quantity is required");
  }else if(quantity<1){
    return res.status(400).json("quantity must be greater than 0");

  }

  try {
   
    const cart = await Cart.findOne({ userId });
    if (cart) {
      
      const productIndex = cart.products.findIndex(
        (p) => p.id.toString() === productId);

      if (productIndex > -1) {
       
        cart.products[productIndex].quantity = quantity;
        await cart.save();
        return res.status(200).json(cart);
      } else {
        return res.status(404).json("Product not found in cart");
      }
    } else {
      return res.status(404).json("Cart not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}

export const getCart = async (req, res) => {
  const userId = req.user.uid;
 
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      return res.status(200).json(cart);
    } else {
      return res.status(404).json("Cart not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message); 
  }
}

export const removeFromCart = async(req, res) => {
  const userId = req.user.uid;
  const { productId } = req.body;
  if (!productId) {
    return res.status(400).json("productId is required");
  }
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.id.toString() === productId
      );
      if (productIndex > -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        if (cart.products.length === 0) {
         cart.products = [];
         await cart.save()
         return res.status(200).json(cart)
        }

        return res.status(200).json(cart);
      } else {
        return res.status(404).json("Product not found in cart");
      }
    } else {
      return res.status(404).json("Cart not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
}

export const CheckoutSession = async(req, res) => {
  const {products} = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
        images: [product.image],
      },
      unit_amount: Math.floor(product.price * 100),
    },
    quantity: product.quantity,
  }));
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",

  })
  res.json({id: session.id})
}