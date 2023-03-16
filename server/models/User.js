const mongoose=require("mongoose")

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
    },
    password:{
        type:String,
    },
    email:{
        type:String,
    },
    profilePic:{
        type:String,
        default:""
    },
    notifications:{
        type:Object,
        default:{}
    },
    status:{
        type:Boolean,
        default:true
    },
    posts:{
        type:[String]
    },
    coverProfile:{
        type:String
    },
    followers:{
        type:[String]
    },
    followings:{
        type:[String]
    }
},{timestamps:true})

module.exports=mongoose.model("user",UserSchema)