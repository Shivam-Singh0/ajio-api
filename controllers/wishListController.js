import WishList from "../models/WishList.js";

export const addToWishlist = async(req, res) => {
    const userId = req.user.uid;
 

    try {
        let wishlist = await WishList.findOne({userId})
        if (wishlist) {
            wishlist.Products.push(product)
            await wishlist.save()
            
        }
        else{
            try {
    
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
    const {productId} = req.body;

    const wishlist = await WishList.findOne({userId});
    if (wishlist) {
        return res.status(200).json(wishlist);
    }else{
        return res.status(400).json("First add product to wishlist");   
    }
}