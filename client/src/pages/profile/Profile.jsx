import React, { useEffect, useState } from 'react'
import "./Profile.scss"
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import PinterestIcon from "@mui/icons-material/Pinterest"
import PlaceIcon from "@mui/icons-material/Place"
import LanguageIcon from "@mui/icons-material/Language"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import Posts from "../../components/posts/Posts"
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
const Profile = () => {
  const {id}=useParams()
  const [user,setUser]=useState(null)
  const currentUser=useSelector(selectCurrentUser)
  const location=useLocation()
  const [friendsPost,setFriendsPost]=useState(null)
  const [clicked,setClicked]=useState(false)

  const handleFollow=async()=>{
    try{
      await axios.put(`http://localhost:3500/api/users/follow/${id}`,{userId:currentUser?._id})
      setClicked(!clicked)
    }
    catch(err){
      console.log(err.message)
    }
  }

  useEffect(()=>{
    const fetchUser=async()=>{
      try{
        const res=await axios.get(`http://localhost:3500/api/users/${id}`)
        const timeline=await axios.get(`http://localhost:3500/api/users/timeline/${location.state?.userId}`)
        setFriendsPost(timeline.data)
        setUser(res.data)

      }
      catch(err){
        console.log(err)
      }
    }
    fetchUser()
  },[id,location.state?.userId])
  return (
    <div className="profile">
      <div className="images">
        <img src={user?.coverProfile} alt=""  className="cover"/>
        <img src={user?.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="userInfor">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon/>
            </a>
            <a href="http://facebook.com">
              <InstagramIcon />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon />
            </a>
            
          </div>
          <div className="center">
            <span>{user?.username}</span>
            <div className="moreInfo">
              <div className="item">
                <PlaceIcon/>
                <span>Nairobi</span>
              </div>
              <div className="item">
                <LanguageIcon/>
                <span>{user?.website}</span>
              </div>
            </div>
            <button onClick={handleFollow}>{clicked?"Unfollow":"Follow"}</button>
          </div>
          <div className="right">
            <Link to="/messenger" style={{textDecoration:"none",color:"inherit"}}>
               <EmailOutlinedIcon/>
            </Link>
            <MoreVertIcon/>
          </div>
        </div>
        <Posts friendsPost={friendsPost}/>
      </div>
    </div>
  )
}

export default Profile
