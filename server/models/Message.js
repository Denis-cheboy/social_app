const mongoose=require("mongoose")

const MessageSchema=new mongoose.Schema({
    conversationId:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    from:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model("message",MessageSchema)