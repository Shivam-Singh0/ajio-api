import mongoose from "mongoose";



const cartSchema = new mongoose.Schema({
    userId: {
         type: String, required: true 
    },
    products: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product", 
                required: true,
            },
            title :{
                type: String,
                required: true
            },
            price : {
              type: Number,
              required: true
            },
            
            quantity: {
                type: Number,
                default: 1,
            },
            image : {
                type: String,
                required: true
            }
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
