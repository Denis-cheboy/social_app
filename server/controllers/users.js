const Post = require("../models/Post")
const User=require("../models/User")

const getUsers=async(req,res,next)=>{
    try{
      const users=await User.find()
      return res.status(200).json(users)
    }
    catch(err){
        next(err)
    }
}

const getUser=async(req,res,next)=>{
    try{
      const user=await User.findById(req.params.id)
      return res.status(200).json(user)
    }
    catch(err){
        next(err)
    }
}

const updateUser=async(req,res,next)=>{
    try{
      const updatedUser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
      return res.status(200).json(updatedUser)
    }
    catch(err){
        next(err)
    }
}

const deleteUser=async(req,res,next)=>{
    try{
      await User.findByIdAndDelete(req.params.id)
      return res.status(200).json("Successfully deleted the user")
    }
    catch(err){
        next(err)
    }
}

const friendShip=async(req,res,next)=>{
    const userId=req.body.userId 
    try{
       const currentUser=await User.findById(userId)
       const friendsUser=await User.findById(req.params.friendId)

       if(userId===req.params.friendId){
         return res.status(200).json("You cannot follow yourself")
       }

       if(currentUser?.followings.includes(req.params.friendId)){
           await User.updateOne({_id:userId},{$pull:{followings:req.params.friendId}})
           await User.updateOne({_id:req.params.friendId},{$pull:{followers:userId}})
           return res.status(200).json(`${currentUser.username} unfollowed ${friendsUser.username}`)
       }
       else{
           await User.updateOne({_id:userId},{$push:{followings:req.params.friendId}})
           await User.updateOne({_id:req.params.friendId},{$push:{followers:userId}})
           return res.status(200).json(`${currentUser.username} followed ${friendsUser.username}`)

       }
    }
    catch(err){
        next(err)
    }
}

const timeline=async(req,res,next)=>{
    const userId=req.params.userId
    try{
      const currentUser=await User.findById(userId)
      const currentUserPosts= await Promise.all(currentUser.posts.map(post=>{
        return Post.findById(post)
      }))
      const currentUserFriends=await Promise.all(currentUser.followings.map(follower=>{
        return User.findById(follower)
      }))
      const currentUserFriendsPosts=await Promise.all(currentUserFriends.map(friend=>{
        return Promise.all(friend.posts.map(post=>{
            return Post.findById(post)
        }))
      }))
      const allPosts=currentUserFriendsPosts.concat(currentUserPosts).flat(Infinity)
      return res.status(200).json(allPosts)
    }
    catch(err){
        next(err)
    }
}

module.exports={
    getUser,getUsers,updateUser,deleteUser,friendShip,timeline
}