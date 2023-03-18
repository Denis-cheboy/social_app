import React, { useEffect, useState } from 'react'
import "./Conversation.css"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
import axios from 'axios'
const Conversation = ({conversation}) => {
  const user=useSelector(selectCurrentUser)
  const [friend,setFriend]=useState(null)
  const friendId=conversation.members.find(member=>member!==user._id)

  useEffect(()=>{
     const fetchFriend=async()=>{
      try{ 
        const res=await axios.get(`https://social-app-api-et09.onrender.com/users/${friendId}`)
        setFriend(res.data)
      }
      catch(err){
        console.log(err)
      }
     }
     fetchFriend()
  },[friendId])
  return (
       <div className="aConversation">
          <img src={friend?.profilePic} alt="user"/>
          <span className="username">{friend?.username}</span>
       </div>
  )
}

export default Conversation
