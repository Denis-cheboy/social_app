import React, { useEffect, useState } from 'react'
import "./Comments.scss"
import bot from "../../photos/botPhoto.jpg"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
import axios from 'axios'
const Comments = ({post,comments,setComments}) => {
    const [message,setMessage]=useState("")
    const user=useSelector(selectCurrentUser)
    const [users,setUsers]=useState(null)

  useEffect(()=>{
    const fetchComments=async()=>{
        try{
           const res=await axios.get(`https://social-app-api-et09.onrender.com/comments/postComments/${post._id}`)
           setComments(res.data)
           
        }
        catch(err){
            console.log(err)
        }
    }
    fetchComments()
},[post._id])

useEffect(()=>{
      const fetchCommentsByUsers=async()=>{
          try{
             const res=await axios.get(`https://social-app-api-et09.onrender.com/comments/commentsByusers/users/${post._id}`)
             setUsers(res.data)
          }
          catch(err){
              console.log(err)
          }
      }
      fetchCommentsByUsers()

  },[comments])

  const handleClick=async(e)=>{
    e.preventDefault()
    try{
        const data={
            content:message,
            userId:user._id
        }
        const res=await axios.post(`https://social-app-api-et09.onrender.com/comments/${post._id}`,data)
        setComments(comment=>[...comment,res.data])
    }
    catch(err){
        console.log(err)
    }
  }
  

  return (
    <div className="comments">
        <div className="write">
            <img src={user?.profilePic} alt="" />
            <input type="text" placeholder="Write a comment" value={message} onChange={(e)=>setMessage(e.target.value)} />
            <button onClick={handleClick} type="submit">Send</button>
        </div>
        {
            comments && users && comments.map((comment,idx)=>users?.map(currentUser=>comment.userId===currentUser._id) && (
                <div className="comment">
                    <img src={users[idx]?.profilePic} alt=""/>
                    <div className="infor">
                    <span>{users[idx]?.username}</span>
                        <p>{comment.content}</p>
                    </div>
                    <span className="date">1 hour ago</span>
                </div>
            ))
        }
    </div>
  )
}

export default Comments
