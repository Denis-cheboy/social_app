const mongoose=require("mongoose")
require("dotenv").config()

const connectDB=async()=>{
    try{
      await mongoose.connect(process.env.MONGO_DB_URI,{
        useNewURLParser:false,
        useUnifiedTopology:false
      })
    }
    catch(err){
        next(err)
    }
}

module.exports=connectDB