const Conversation=require("../models/Conversation")

const createConversation=async(req,res,next)=>{
    try{
      const newConversation=await Conversation.create({
        members:[req.body.senderId,req.body.receiverId]
      })
      return res.status(201).json(newConversation)
    }
    catch(err){
        next(err)
    }
}

const getConversations=async(req,res,next)=>{
    try{
      const conversations=await Conversation.find({
        members:{$in:[req.params.userId]}
      })
      return res.status(200).json(conversations)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    createConversation,getConversations
}