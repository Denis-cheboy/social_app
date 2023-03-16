import React, { useEffect } from 'react'
import "./OnlineFriend.scss"
import { useState } from 'react'
import axios from 'axios'

const OnlineFriend = ({member}) => {
  const memberId=member.userId
  const [friend,setFriend]=useState([])
  useEffect(()=>{
      const fetchMember=async()=>{
        try{
          
           const res=await axios.get(`http://localhost:3500/api/users/${memberId}`)
           setFriend(res.data)
        }
        catch(err){
          console.log(err)
        }
      }
      fetchMember()
    
  },[memberId])
  return (
    <div className="aOnlineFriend">
        <div className="imageWrapper">
          <img src={friend?.profilePic} alt="user"/>
          <div className="badge"></div>
        </div>
        <span className="username">{friend?.username}</span>
    </div>
  )
}

export default OnlineFriend
