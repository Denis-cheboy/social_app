const mongoose=require("mongoose")

const ConversationSchema=new mongoose.Schema({
    members:{
        type:[String]
    }
},{timestamps:true})

module.exports=mongoose.model("conversation",ConversationSchema)