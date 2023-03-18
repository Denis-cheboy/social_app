import React, { useEffect } from 'react'
import {Link} from "react-router-dom"
import { useState } from 'react'
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined"
import FavoriteOutlined  from "@mui/icons-material/FavoriteOutlined"
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined"
import Comment from "../../components/comments/Comments"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import "./Post.scss"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
import axios from "axios"
const Post = ({post}) => {
    const [liked,setLiked]=useState(false)
    const [commentOpen,setCommentOpen]=useState(false)
    const [likesCount,setLikesCount]=useState(post?.likes?.length)
    const [commentCount,setCommentCount]=useState(post?.comments?.length)
    const [comments,setComments]=useState(null)
    const [currUser,setCurrUser]=useState(null)

    const user=useSelector(selectCurrentUser)

    const handleClick=async()=>{
      setLiked(!liked)
      try{
         const res=await axios.put(`https://social-app-api-et09.onrender.com/posts/like/${post?._id}`,{userId:user?._id})
         setLikesCount(res.data.post.likes.length)
      }
      catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
       const fetchPost=async()=>{
        try{
          const res=await axios.get(`https://social-app-api-et09.onrender.com/posts/${post?._id}`)
          setCommentCount(res.data.comments.length)

        }
        catch(err){
          console.log(err)
        }
       }
       fetchPost()
    },[comments])

    useEffect(()=>{
       const fetchUser=async()=>{
        try{
          const res=await axios.get(`https://social-app-api-et09.onrender.com/users/${post?.userId}`)
          setCurrUser(res.data)
        }
        catch(err){
          console.log(err)
        }
       }
       fetchUser()
    },[post])
  return (
    <div className="post">
        <div className="container">
            <div className="user">
                <div className="userInfo">
                    <img src={currUser?.profilePic} alt="" />
                    <div className="details">
                        <Link to={`/profile/${post?.userId}`} style={{textDecoration:"none",color:"inherit"}} state={{userId:post?.userId}}>
                            <span className='name'>{currUser?.username}</span>
                            <span className="date">1 min ago</span>
                        </Link>
                    </div>
                </div>
                <MoreHorizIcon/>
            </div>
            <div className="content">
                <p>{post?.content}</p>
                <img src={post?.postPhoto} alt="" />
            </div>
            <div className="info">
                <div className="item">
                  {liked?<FavoriteOutlined onClick={handleClick}/>:<FavoriteBorderOutlinedIcon onClick={handleClick}/>}
                  {likesCount} Likes
                </div>
                <div className="item">
                  <TextsmsOutlinedIcon onClick={()=>setCommentOpen(!commentOpen)}/>
                  {commentCount} Comments
                </div>
                <div className="item">
                  <ShareOutlinedIcon/>
                   Share
                </div>
            </div>
            {commentOpen && <Comment post={post} comments={comments} setComments={setComments}/>}
        </div>
    </div>
  )
}

export default Post
