import Products from "../models/Products.js"

export const addProduct = async (req, res) => {
   
    const { title, price, category, image } = req.body
    if (!title || !price || !category || !image) {
        for (const field of ["title", "price", "category", "image"]) {
            if (!req.body[field]) {
                return res.status(400).json(`${field} is required`)
            }
        }
    }
    try {
        const product = await Products.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json(error.message);
    }
}

export const getAllProduct = async(req, res) => {
    try {
        const products = await Products.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

export const getSingleProduct = async(req, res) => {
    try {
        const {id} = req.params
        const product = await Products.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json('Invalid Id');
    }
}

export const getInCategory = async(req, res) => {
    try {
        const {category} = req.params
        const products = await Products.find({category})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error.message);
    }
}