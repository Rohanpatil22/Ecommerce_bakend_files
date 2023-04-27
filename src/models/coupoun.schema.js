import mongoose from "mongoose";

const coupounSchema= new mongoose.Schema(
    {
        code:{
            type:String,
            required:[true,"Please provide coupon code"]
        },
        discount:{
            type:Number,
            default:0
        },
        active:{
            type:String,
            default:true
        }

},
{timestamps:true}
);

export default mongoose.model("Coupon",coupounSchema)