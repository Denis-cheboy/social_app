import React from 'react'
import "./LeftBar.scss"
import bot from "../../photos/botPhoto.jpg"
import logo1 from "../../photos/logo1.jpg"
import logo2 from "../../photos/logo1.jpg"
import logo3 from "../../photos/logo1.jpg"
import logo4 from "../../photos/logo4.jpeg"
import logo5 from "../../photos/logo5.jpeg"
import logo6 from "../../photos/logo6.jpeg"
import logo7 from "../../photos/logo7.jpeg"
import logo8 from "../../photos/logo8.jpeg"
import logo9 from "../../photos/logo9.jpeg"
import logo10 from "../../photos/logo10.jpeg"
import logo11 from "../../photos/logo11.jpeg"
import logo12 from "../../photos/logo12.jpeg"
import logo13 from "../../photos/logo13.jpeg"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'
const LeftBar = () => {
  const user=useSelector(selectCurrentUser)
  return (
    <div className="leftBar">
      <div className="container">
         <div className="menu">
              <div className="user">
                  <img src={user?.profilePic?user.profilePic:bot} alt="" />
                  <span>{user.username}</span>
              </div>
              <div className="item">
                <img src={logo1} alt="" />
                <span>Friends</span>
              </div>
              <div className="item">
                <img src={logo2} alt="" />
                <span>Groups</span>
              </div>
              <div className="item">
                <img src={logo3} alt="" />
                <span>Marketplace</span>
              </div>
              <div className="item">
                <img src={logo4} alt="" />
                <span>Watch</span>
              </div>
              <div className="item">
                <img src={logo5} alt="" />
                <span>Memories</span>
              </div>
          </div>
          <hr/>
          <div className="menu">
              <span>Your Shortcuts</span>
              <div className="item">
                <img src={logo6} alt="" />
                <span>Events</span>
              </div>
              <div className="item">
                <img src={logo7} alt="" />
                <span>Gaming</span>
              </div>
              <div className="item">
                <img src={logo8} alt="" />
                <span>Gallery</span>
              </div>
              <div className="item">
                <img src={logo9} alt="" />
                <span>Videos</span>
              </div>
              <div className="item">
                <img src={logo10} alt="" />
                <span>Messages</span>
              </div>
            </div>
            <hr/>
            <div className="menu">
              <span>Others</span>
              <div className="item">
                <img src={logo11} alt="" />
                <span>Fundraiser</span>
              </div>
              <div className="item">
                <img src={logo12} alt="" />
                <span>Courses</span>
              </div>
              <div className="item">
                <img src={logo13} alt="" />
                <span>Tutorials</span>
              </div>
              
            </div>
      </div>
    </div>
    
  )
}

export default LeftBar
