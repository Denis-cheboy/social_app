const mongoose=require("mongoose")

const PostSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    comments:{
        type:[String]
    },
    likes:{
        type:[String]
    },
    postPhoto:{
        type:String
    },
    userId:{
        type:String,
        rqeuired:true
    }

},{timestamps:true})

module.exports=mongoose.model("post",PostSchema)