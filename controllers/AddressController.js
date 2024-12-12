import Address from "../models/Address.js";



export const addAdress = async(req, res) => {
    const userId = req.user.uid;
    const address = await Address.findOne({userId});
    if (address) {
        try {
             address.address.push(req.body)
             await address.save();
            return res.status(200).json(address);
        } catch (error) {
            return res.status(400).json(error);
        }
    }
    else  {
        try {
            address = await Address.create({userId, adress : [req.body]})
            return res.status(200).json(address);
        }catch {
            return res.status(400).json(error);   
        }
    }
}