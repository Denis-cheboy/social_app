const mongoose=require("mongoose")

const CommentSchema=new mongoose.Schema({
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
    },
    replies:{
        type:[String]
    }
},{timestamps:true})

module.exports=mongoose.model("comment",CommentSchema)