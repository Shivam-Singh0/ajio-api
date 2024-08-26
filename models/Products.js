import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    price: {
        type : Number,
        required : true
    },
    category: {
        type : String,
        required : true,
        enum: ["men's clothing", "women's clothing", "jewelery", "electronics"]
    },
    image : {
        type : String,
        required : true
    },
    rating: {
       rate:{
           type: Number,
           default: 0
       },
       count: {
           type: Number,
           default: 0
       }
    }

})

export default mongoose.model('Product', productSchema)