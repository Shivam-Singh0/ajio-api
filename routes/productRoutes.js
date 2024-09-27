import express from 'express'
import { addProduct, getAllProduct, getInCategory, getSingleProduct } from '../controllers/productController.js'



const router = express.Router()

router.route('').get(getAllProduct)
router.route('/:id').get(getSingleProduct)
router.route('/category/:category').get(getInCategory)



export default router