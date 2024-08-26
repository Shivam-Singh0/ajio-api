import express from 'express'
import { connectToDb } from './db/db.js';
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser';
import cartRouter from './routes/cartRoutes.js'
import productRoutes from './routes/productRoutes.js'

const app = express()
dotenv.config({ path: './.env' })

connectToDb();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use('/api/auth', userRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRouter)
app.listen(`3000`, () => console.log(`server running on port 3000`));

