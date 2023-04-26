import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
    {
        name : {

            type:String,
            trim : true,
            required : ['true',"please provide collection name"],
            maxLength : [120,"You are allowed to add maximum 120 characters"]

        }
      
    },
    { timestamps : true}
);

export default mongoose.model("Collection",collectionSchema);