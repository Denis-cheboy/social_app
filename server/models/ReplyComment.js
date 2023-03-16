const mongoose=require("mongoose")

const Reply=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    likes:{
        type:[String]
    }
},{timestamps:true})

module.exports=mongoose.model("reply",Reply)