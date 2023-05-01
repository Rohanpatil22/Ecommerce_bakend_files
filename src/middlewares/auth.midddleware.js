import asynchandler from "../services/asyncHandler.js";
import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import CustomError from "../utils/CustomError.js";


export const isLoggedIn= asynchandler(async(req,res,next)=>{

    let token;

    if(req.cookies.token || (req.headers.authorozation && req.headers.authorozation.startsWith("Bearer")))
    {

        token=req.cookies.token || req.headers.authorozation.split("")[1];

         // token = "Bearer gbhnjm235r5hbnj"
    }

    if(!token)
    {
        throw new CustomError("Not authorized to access this resource", 401);
    }

    try {

        const decodedJwtPayload= JWT.verify(token, config.JWT_SECRET);

        req.User=User.findById(decodedJwtPayload._id,"name email role");
        next();
    } catch (error) {

        throw new CustomError("Not authorized to access this resource", 401);
    }
})

export const authorize=(...requiredRoles)=>asynchandler(async(req,res,next)=>{

    if(!requiredRoles.includes(req.user.role))
    {
        throw new CustomError("Not authorized to access this resource", 401);
    }

    next()
})