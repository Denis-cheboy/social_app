const Comment=require("../models/Comment")
const Post=require("../models/Post")
const User = require("../models/User")

const createComment=async(req,res,next)=>{
    try{
        const newComment=await Comment.create({
            content:req.body.content,
            userId:req.body.userId
        })
        try{
            await Post.findByIdAndUpdate(req.params.id,{$push:{comments:newComment._id}},{new:true})
        }
        catch(err){
            next(err)
        }
        return res.status(201).json(newComment)
    }
    catch(err){
        next(err)
    }


}

const deleteComment=async(req,res,next)=>{
    try{
      await Comment.findByIdAndDelete(req.params.commentId)
      try{
       await Post.findByIdAndUpdate(req.params.postId,{$pull:{comments:req.params.commentId}},{new:true})
      }
      catch(err){
        next(err)
      }
      return res.status(200).json("Successfully deleted the comment")
    }
    catch(err){
        next(err)
    }
}

const updateComment=async(req,res,next)=>{
    try{
      const updatedComment=await Comment.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      return res.status(200).json(updatedComment)
    }
    catch(err){
        next(err)
    }
}


const getCommentsByPost=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id)
        const comments=await Promise.all(post.comments.map(comment=>{
            return Comment.findById(comment)
        }))
        return res.status(200).json(comments)

    }
    catch(err){
        next(err)
    }
}

const getCommentByUsers=async(req,res,next)=>{
     try{
        const post=await Post.findById(req.params.id)
        const comments=await Promise.all(post.comments.map(comment=>{
            return Comment.findById(comment)
        }))
        const users=await Promise.all(comments.map(comment=>{
            return User.findById(comment.userId)
        }))
        return res.status(200).json(users)
     }
     catch(err){
        next(err)
     }
}


const getComments=async(req,res,next)=>{
    try{
     const comments=await Comment.find()
     return res.status(200).json(comments)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    createComment,deleteComment,updateComment,getComments,getCommentsByPost,getCommentByUsers
}