// protect routes by checking the jwt token

import jwt from 'jsonwebtoken';
import User from '../models/userModel.js'


const authMiddleware = async (req,res,next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if(!token) return res.status(401).json({message:'Access denied'});

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    }catch (error){
        res.status(400).json({message: 'Invalid token'})
    }

};

export default authMiddleware;