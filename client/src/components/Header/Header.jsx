import React from 'react'
import "./Header.scss"
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined"
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined"
import GridViewOutlinedIcon  from "@mui/icons-material/GridViewOutlined"
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import PersonOutlinedIcon from "@mui/icons-material/PersonOutline"
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined"
import { Link } from 'react-router-dom'
import { useApp } from '../../context/appContext'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'

const Header = () => {
  const {toggle,darkMode}=useApp()
  const user=useSelector(selectCurrentUser)
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{textDecoration:"none"}}>
           <span>denosocial</span>
        </Link>
        <HomeOutlinedIcon/>
        { darkMode ?<DarkModeOutlinedIcon onClick={toggle}/> :<WbSunnyOutlinedIcon onClick={toggle}/>}
        <GridViewOutlinedIcon/>
        <div className="search">
          <SearchOutlinedIcon/>
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="right">
        <PersonOutlinedIcon/>
        <Link to="/messenger" style={{textDecoration:"none",color:"inherit"}}>
          <EmailOutlinedIcon />
        </Link>
        <NotificationsOutlinedIcon/>
        <div className="user">
          <img src={user?.profilePic} alt="user" />
          <span>{user.username}</span>
        </div>
      </div>
    </div>
  )
}

export default Header
