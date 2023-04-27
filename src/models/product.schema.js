import mongoose from "mongoose";

const productSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:["true","name sholud be required"],
            maxLength:[30,"product name should be less than 30 characters"],
            trim:true
        },

        price:{
            type:Number,
            required:["true","Price is required"],
            maxLength:[5,"price should not be greater 5 characters"]
        },

        description:{
            type:String,
        },

        photos:[
            {
                secure_url:{
                    type:String,
                    required:true
                }
            }
        ],

        stock:{

            type:Number,
            default:0
        },

        sold:{

            type:Number,
            default:0
        },
        collectionId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Collection"
        }
    },
    {timestamps:true}
    );

    export default mongoose.model("Product",productSchema);