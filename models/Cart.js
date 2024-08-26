import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", 
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
},{ timestamps: true });

cartSchema.index({ "products.productId": 1 });

cartSchema.method("toJSON", function toJSON() {
    let {products, __v, ...object} = this.toObject();
    products = products.map(({ _id, ...object }) => {
      return {
        ...object
      };
    })
    return {
     
      ...object,
      products,
      
    };
  });

export default mongoose.model("Cart", cartSchema);
