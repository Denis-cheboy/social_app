const Message=require("../models/Message")

const createMessage=async(req,res,next)=>{
    try{
        const newMessage=await Message.create(req.body)
        return res.status(201).json(newMessage)

    }
    catch(err){
        next(err)
    }
}

const getMessages=async(req,res,next)=>{
    try{
      const messages=await Message.find({
        conversationId:req.params.conversationId
      })
      return res.status(200).json(messages)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    createMessage,getMessages
}