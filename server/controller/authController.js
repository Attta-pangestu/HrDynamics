import User from "../models/User.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const login = async (req,res) =>{
    try {
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(200).json({success: false,error:"ID or Password is incorrect"})
        }
        
        // The commented code below is used to show separate error messages for an incorrect ID or password.
        // const isMatched = await bcrypt.compare(password,user.password)
        // if(!isMatched){
        //     return res.status(200).json({
        //         success: false,
        //         error:"Password Not Matched"
        //     })
        // }

        // Generate JWT token if credentials are correct
        const token = jwt.sign(
            {_id: user._id,role: user.role},
            process.env.JWT_KEY, 
            {expiresIn:"10d"},
        )
        console.log("success")
        return res.status(200).json({
            success:true,
            token,
            user:{name:user.name,role:user.role}
        })
        
    } catch(error){
        return res.status(200).json({
            success:false,
            error: error.message,
        })
    }
}

const verify = (req,res) =>{
    return res.status(200).json({
        success : true,
        user: req.user
    })
}
export {login,verify}