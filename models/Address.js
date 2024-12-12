import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
  address: [
    {
      Name: {
        type: String,
        required: true,
      },
      Mobile: {
        type: Number,
        required: true,
      },
      Pincode: {
        type: Number,
        required: true,
      },
      Locality: {
        type : String,
        required : true
      },
      Flat: {
        type : String,
        required : true
      },
      District: {
        type : String,
        required : true
      },
      Landmark : {
        type : String,
        
      },
      State : {
        type : String,
        required : true
      },
      City : {
        type : String,
        required : true
      }
    },
  ],
});
export default mongoose.model("Address", addressSchema);