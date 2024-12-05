import jwt from 'jsonwebtoken'
export default function createToken (res, user) {
    const token = jwt.sign({'id': user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.cookie('token', token)
    return token;
}
