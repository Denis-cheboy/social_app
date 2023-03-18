import React, { useEffect, useState } from 'react'
import "./Message.css"
import axios from 'axios'
import bot from "../../photos/botPhoto.jpg"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
import { useApp } from '../../context/appContext'
const Message = ({message}) => {
  const user=useSelector(selectCurrentUser)
  const [friend,setFriend]=useState(null)
  const {currentConversation}=useApp()
  const friendId=currentConversation.members.find(member=>member!==user._id)
  useEffect(()=>{
    const fetchFriend=async()=>{
      try{
        const res=await axios.get(`https://social-app-api-et09.onrender.com/users/${friendId}`)
        setFriend(res.data)
      }
      catch(err){

      }
    }
    fetchFriend()
  },[friendId])

  return (
    <div className={user._id===message?.from?"aMessage own":"aMessage"}>
        <div className="aMessageTop">
            <img src={user._id===message?.from?user?.profilePic:friend?.profilePic} alt="" className="profile"/>
            <span className="message">{message.content}</span>
        </div>
        <span className="aMessageTime">12Minutes ago</span>
    </div>
  )
}

export default Message
