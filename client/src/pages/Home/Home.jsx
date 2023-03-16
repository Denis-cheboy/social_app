import React, { useState } from 'react'
import "./Home.scss"
import Storie from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Add from '@mui/icons-material/AddOutlined'
import CreatePost from '../../components/createPost/CreatePost'
const Home = () => {
  const [open,setOpen]=useState(false)
  const [posts,setPosts]=useState(null)
  return (
    <div className="home">
       <Storie/>
       <div className="createPostWrapper" onClick={()=>setOpen(!open)}>
         <span>What is in your mind!, would you like to share</span>
         <Add sx={{fontSize:"20px",color:"white",padding:"8px", borderRadius:"50%",backgroundColor:"blue"}}/>
       </div>
       {open && <CreatePost setPosts={setPosts} posts={posts} setOpen={setOpen}/>}
       <Posts setPosts={setPosts} posts={posts}/>
    </div>
  )
}

export default Home
