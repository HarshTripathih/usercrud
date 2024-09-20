import mongoose from "mongoose";

const userSchema = new  mongoose.Schema({
    firstName:{
        type:String, 
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    phoneNo:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    age:{
        type:Number,
    },
    address:{
        type:String,
    },
},{
    timestamps:true
})

const userModel = mongoose.model("User",userSchema);

export default userModel;