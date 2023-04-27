import mongoose from "mongoose";
import orderedStatus from "../utils/orderedStatus";

const orderSchema= new mongoose.Schema(
    {
        product:{

            type:[
                {
                    productId : {
                        type: mongoose.Schema.Types.ObjectId,
                         ref:"Product"
                    },
                    price:Number,
                    count:Number
                }
                
            ],
            required:true
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },

        address:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:String,
            required:true
        },

        amount:{
            type:Number,
            required:true
        },
        coupoun:String,
        tramsactionId:String,

        status:{
            type:String,
            enum: ["ORDERED", "SHIPPED", "DELIVERED", "CANCELLED"],
            DEFAULT:"ORDERED"
        },

       // homework solution
        // status:{
        //     type:String,
        //     enum:Object.values(orderedStatus),
        //     default: orderedStatus.ORDERED
        // }
    },
    {timestamps:true}
    );

    export default mongoose.model("Order",orderSchema)