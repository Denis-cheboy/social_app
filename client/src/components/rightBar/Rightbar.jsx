import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import "./Rightbar.scss"
import bot from "../../photos/botPhoto.jpg"
import {useSelector} from "react-redux"
import axios from 'axios'
import { selectCurrentUser } from '../../features/authSlice'
import { useApp } from '../../context/appContext'
import OnlineFriend from '../OnlineFriend/OnlineFriend'
const Rightbar = () => {
  const [users,setUsers]=useState([])
  const [clicked,setClicked]=useState(false)
  const user=useSelector(selectCurrentUser)
  const {socket,members,setMembers}=useApp()

    useEffect(()=>{
      socket.on("connect",()=>{
          socket.emit("new-user",user?._id,socket.id)
      })
    },[])

    socket.off("members").on("members",(members)=>{
      setMembers(members)
  })

  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const res=await axios.get("https://social-app-api-et09.onrender.com/users")
        setUsers(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    fetchUsers()
  },[])

  const handleFollow=async(friendId)=>{
    setClicked(!clicked)
    try{
      await axios.put(`https://social-app-api-et09.onrender.com/users/follow/${friendId}`,{userId:user?._id})
    }
    catch(err){
      console.log(err.message)
    }
  }
  
  const handleDismiss=(userId)=>{
    const list=users.slice(0,5).filter(user=>user?._id!==userId)
    setUsers(list)
  }
  const newMembersArray=members.filter(member=>member.userId!==user?._id)
  
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          {
            users && users.slice(0,5).filter(currUser=>currUser?._id!==user?._id).map((user,idx)=>(

              <div className="user">
                <Link to={`/profile/${user._id}`} style={{textDecoration:"none",color:"inherit"}} state={{userId:user._id}}>
                  <div className="userInfo" >
                    <img src={user?.profilePic?user.profilePic:bot} alt="" />
                    <span>{user.username}</span>
                  </div>
                </Link>
                <div className="buttons">
                  <button onClick={()=> handleFollow(user?._id)}>{clicked?"unfollow":"Follow"}</button>
                  <button onClick={()=>handleDismiss(user._id)}>Dismiss</button>
                </div>
              </div>

            ))
           
          }
        </div>
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src={bot} alt="" />
             <p>
              <span>Jane Doe</span> Changed their cover profile
             </p>
            </div>
           <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={bot} alt="" />
             <p>
              <span>Jane Doe</span> Changed their cover profile
             </p>
            </div>
           <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={bot} alt="" />
             <p>
              <span>Jane Doe</span> Changed their cover profile
             </p>
            </div>
           <span>1 minute ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src={bot} alt="" />
             <p>
              <span>Jane Doe</span> Changed their cover profile
             </p>
            </div>
           <span>1 minute ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          {
            newMembersArray.map(member=>(
              <OnlineFriend member={member}/>
             ))
          }
        </div>
      </div>
    </div>
  )
}

export default Rightbar
