import asynchandler from "../services/asyncHandler";
import CustomError from "../utils/CustomError";
import User from "../models/user.schema.js"

export const cookieOptions={
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true
}
export const signUp= asynchandler(async(res,res)=>{

    //get data from user
    const {name,email,password}=req.body;

    if(!email || !name || !password){

        throw new CustomError("Please provide all the fields",400);
    }

    // check whether user is already exists
    const existingUser=await User.findOne({email});

    if(existingUser){

        throw new CustomError("User already exists",400);
    }

    const user=await User.create({
        email,
        name,
        password
    })

    const token=User.getJWTtoken();

    //store token into user cookie
    res.cookie("token",token,cookieOptions);

    User.password=undefined;

    res.status(200).json({
        success:true,
        user,
        token,
    })

})


export const login= asynchandler(async(req,res)=>{

    const{email,password}=req.body;

    if(!email || !password)
    {
        throw new CustomError("Please provide all the fields", 400);
    }

    const user= await User.findOne({email}).select("+password")

    if(!user)
    {
        throw new CustomError("Invalid credebtials",400)
    }

    const ispasswordMatched= await User.comparePassword(password)

    if(ispasswordMatched){

        const token=User.getJWTtoken();
        user.password=undefined
        res.cookie("token",token.cookieOptions)

        return res.status(200).json({

            success:true,
            token,
            user
        })

    }
})

export const logout = asynchandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message: 'Logged Out'
    })
})

export const getProfile= asynchandler(async(req, res, next) => {

    const{user}=req;
    if(!user){
        throw new CustomError("User not found",404);
    }

    res.status(200).json({
        success:true,
        user
    })
})