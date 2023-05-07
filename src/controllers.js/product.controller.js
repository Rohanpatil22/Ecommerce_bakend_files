import { Product } from "../models/product.schema.js";
import config from "../config/index.js";
import CustomError from "../utils/CustomError.js"
import formidable from "formidable";
import { s3FileUpload,s3FileDelete } from "../services/imageUpload.js";
import Mongoose from "mongoose";
import asynchandler from "../services/asyncHandler.js"
import mongoose from "mongoose";


export const addProduct=asynchandler(async(req,res)=>{

    const form= formidable({multiples:true, keepExtensions:true});

    form.parse(req,async function(err,fields,files){

        if (err) {
            throw new CustomError(err.message || "Something went wrong", 500);

            let productId = new Mongoose.Types.ObjectId().toHexString();
            console.log(fields, files);
        }
    })
})