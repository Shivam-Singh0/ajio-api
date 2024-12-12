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
        require: true,
      },
      Mobile: {
        type: Number,
        require: true,
      },
      Pincode: {
        type: Number,
        require: true,
      },
      Locality: {
        type : String,
        require : true
      },
      Flat: {
        type : String,
        require : true
      },
      District: {
        type : String,
        require : true
      },
      Landmark : {
        type : String,
        
      },
      State : {
        type : String,
        require : true
      },
      City : {
        type : String,
        require : true
      }
    },
  ],
});
export default mongoose.model("Address", addressSchema);