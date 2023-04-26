import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import config from "../config/index.js";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
      
                name : {
                    type: String,
                    required : ["true","user name should be required"],
                    maxLength : [60,"length should not be more then 60 characters"],

                },

                email :{
                    type : String,
                    required : [true ,"Email is required"]
                },

                password :{
                    type:String,
                    minLength : [8 ,"minimum length of password should be 8 characters"],
                    required : [true, "Password is required"],
                    select : false
                },
                
                role :{
                    type:String,
                    enum:Object.values(AuthRoles),
                    default: AuthRoles.USER
                },
                forgetPasswordToken:String,
                forgetPasswordExpiry:Date
        
    },
    {timestamps:true}
    );

    //Encript the password before saving

userSchema.pre("save",async function(){

    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods={

    comparePassword: async function(enteredPassword){

        return await bcrypt.compare(enteredPassword,this.password)
    },

    getJWTtoken: function(){
        JWT.sign({_id:this._id,role:this.role},config.JWT_SECRET,{
            expiresIn:config.JWT_EXPIRY
        })
    },

    generatePasswordToken: function(){
        const forgotToken=crypto.randomBytes(20).toString('hex')

        this.forgetPasswordToken=crypto
        .createHash("sha256")
        .update(forgotToken)
        .digest("hex")

        this.forgetPasswordExpiry = Date.now() + 20 * 60 * 1000

        return forgotToken
    }
}

export default mongoose.model("User", userSchema);

