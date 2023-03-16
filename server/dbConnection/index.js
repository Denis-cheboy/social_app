const mongoose=require("mongoose")

const connectDB=async()=>{
    try{
      await mongoose.connect("mongodb://127.0.0.1:27017/messagesDB",{
        useNewURLParser:false,
        useUnifiedTopology:false
      })
    }
    catch(err){
        next(err)
    }
}

module.exports=connectDB