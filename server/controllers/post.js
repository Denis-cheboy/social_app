const Post=require("../models/Post")
const User=require("../models/User")

const createPost=async(req,res,next)=>{
    const {content,postPhoto,userId}=req.body
    try{
        const newPost=await Post.create({
          content:content,
          postPhoto:postPhoto,
          userId:userId
        })
        try{
          await User.findByIdAndUpdate(req.params.id,{$push:{posts:newPost._id}},{new:true})
        }
        catch(err){
            next(err)
        }
        return res.status(201).json(newPost)
    }
    catch(err){
        next(err)
    }

}

const likePost=async(req,res,next)=>{
    try{
        const post=await Post.findById(req.params.id)
        if(post.likes.includes(req.body.userId)){
            const post=await Post.findByIdAndUpdate({_id:req.params.id},{$pull:{likes:req.body.userId}},{new:true})
            return res.status(200).json({post,msg:`you disliked post ${post.content}`})
        }
        else{
            const post=await Post.findByIdAndUpdate({_id:req.params.id},{$push:{likes:req.body.userId}},{new:true})
            return res.status(200).json({post,msg:`you liked post ${post.content}`})
        }
    }
    catch(err){
        next(err)
    }
}

const deletePost=async(req,res,next)=>{
    try{
        await Post.findByIdAndDelete(req.params.id)
        try{
           await User.findByIdAndUpdate(req.params.userId,{$pull:{posts:req.params.id}},{new:true})
        }
        catch(err){
            next(err)
        }

    }
    catch(err){
        next(err)
    }
}

const getPosts=async(req,res,next)=>{
    try{
      const posts=await Post.find()
      return res.status(200).json(posts)
    }
    catch(err){
        next(err)
    }
}

const getPost=async(req,res,next)=>{
    try{
      const post=await Post.findById(req.params.id)
      return res.status(200).json(post)
    }
    catch(err){
        next(err)
    }
}

const updatePost=async(req,res,next)=>{
    try{
      const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      return res.status(200).json(updatedPost)
    }
    catch(err){
        next(err)
    }
}

const postLikes=async(req,res,next)=>{
    const post=await Post.findById(req.params.id)
    return res.status(200).json(post.likes.length)
}

module.exports={
    createPost,deletePost,updatePost,getPost,getPosts,likePost,postLikes
}