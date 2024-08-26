import jwt from 'jsonwebtoken'
import User from '../models/User.js'
export const Authenticated = async (req, res, next) => {

    const token = await req.cookies.token
   
    if (token) {

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authenticated' })
            
        }

    }else{
        res.status(401).json({ message: 'Not authenticated' })
    }
}
export const Admin = async (req, res, next) => {

    if (req.user && req.user.admin) {
        next();   
    }
    else{
        res.status(401).json({ message: 'Not authorized as an admin' })
        
    }
}

