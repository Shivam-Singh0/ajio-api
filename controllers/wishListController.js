import WishList from "../models/WishList.js";

export const addToWishlist = async(req, res) => {
    const userId = req.user.uid;
    const {title, productId, image, price, rating} = req.body;
 

    try {
        let wishlist = await WishList.findOne({userId})
        if (wishlist) {
            wishlist.Products.push({title,id: productId, image, price, rating})
            await wishlist.save()
            
        }
        else{
            try {
                wishlist =  await WishList.create({userId, Products: [{title,id: productId, image, price, rating}]})
    
            } catch (error) {
                console.log(error);
                return res.status(500).json(error.message);
            }
        }
        return res.status(200).json(wishlist); 
    } catch (error) {
        console.log(error);
        return res.status(400).send("Wishlist Empty")
    }

    
}

export const removeWishlist = async(req, res) => {
    const userId = req.user.uid;
    const {productId} = req.body;

    const wishlist = await WishList.findOne({userId});
    const idx = wishlist.Products.findIndex((p) => p.id.toString() === productId);
    if (idx > - 1) {
        wishlist.Products.splice(idx, 1);
        await wishlist.save();
        
    }
    return res.status(200).json(wishlist);
}

export const getWishlist = async(req, res) => {
    const userId = req.user.uid;
 
    const wishlist = await WishList.findOne({userId});
    if (wishlist) {
        return res.status(200).json(wishlist);
    }else{
        return res.status(400).json("First add product to wishlist");   
    }
}

export const isWishlisted = async (req, res) => {
    const {productId} = req.body;
    let wishlisted = false;
    const wishlist = await WishList.findOne({userId})
    if (wishlist) {
        const idx = wishlist.Products.findIndex((p) => p.id === productId);
        if (idx > -1) {
            wishlisted = true;
        }
       
    }else{
        wishlisted = false;
    }

    return  res.status(200).json(wishlisted);
}

