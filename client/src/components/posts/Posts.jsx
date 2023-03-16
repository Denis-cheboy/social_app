import React from 'react'
import "./Posts.scss"
import Post from "../post/Post"
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
import axios from 'axios'
const Posts = ({setPosts, posts,friendsPost}) => {

  const user=useSelector(selectCurrentUser)
  useEffect(()=>{
    const fetchTimelinePosts=async()=>{

       try{
          const  res=await axios.get(`http://localhost:3500/api/users/timeline/${user?._id}`)
          setPosts(res.data)
       }
       catch(err){
         console.log(err)
       }

    }
    fetchTimelinePosts()
  },[user?._id])


  return (
    <div className="posts">
      {
        !posts &&  !friendsPost && <h2>No available timeline posts please create your own post</h2>
      }
     
      {
        friendsPost? friendsPost.sort((a,b)=>a._id>b._id?-1:1).map(friendsPost=>(
          <Post post={friendsPost} key={friendsPost?.id}/>
        )):
        posts?.sort((a,b)=>a._id>b._id?-1:1).map(post=>(
              <Post post={post} key={post?.id}/>
        ))
      }
    </div>
  )
}

export default Posts
