import mongoose, { mongo } from "mongoose";

const orderSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    products:[
        {
            "title" : {
            type : String,
            required : true
            },
            "price" : {
                type : Number,
                required : true
            },
            "quantity" : {
                type : Number,
                required : true
            },
            "image" : {
                type : String,
                required : true
            }
        }
    ],
    delivered : {
        type: Boolean,
        default: false
    }

},{ timestamps: true})
export default mongoose.model("Order", orderSchema)