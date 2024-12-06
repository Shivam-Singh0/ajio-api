import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
    userId : {
        type : String,
        required: true
    },

    Products : [
        {
            id : {
                type : mongoose.Schema.Types.ObjectId
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
             },
            title :{
                type: String,
                required: true
            },
            price : {
              type: Number,
              required: true
            },

            image : {
                type: String,
                required: true
            }
        }
    ]
},{timestamps: true})

export default mongoose.model("Wishlist", wishlistSchema);