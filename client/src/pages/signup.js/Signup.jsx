import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import "./Signup.scss"
import axios from "axios"
import {Link} from "react-router-dom"
import Add from "@mui/icons-material/Add"
import bot from "../../photos/botPhoto.jpg"
import { useRegisterMutation } from '../../apiClient/apiSlice'
import { setCredentials } from '../../features/authSlice'
import {  useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate=useNavigate()
    const [register,{isLoading,isError,error}]=useRegisterMutation()
    const [image,setImage]=useState("")
    const [imagePreview,setImagePreview]=useState("")
    const [uploadingImage,setUploadingImg]=useState(false)

    const dispatch=useDispatch()
  const [signUser,setSignUser]=useState({
    email:"",
    password:"",
    profilePic:"",
    username:""
  })
  const addImage=(e)=>{
    const file=e.target.files[0]
    if(file.size>=1048576){
        alert("File must be less than 1mb")
    }
    else{
        setImage(file)
        setImagePreview(URL.createObjectURL(file))
    }
  }
  const uploadImg=async(image)=>{
     const data=new FormData()
     data.append("file",image)
     data.append("upload_preset","Deno@1")
     try{
        setUploadingImg(true)
       const res=await axios.post("https://api.cloudinary.com/v1_1/dwzcawi1h/image/upload",data)
       setUploadingImg(false)
       return res.data.url
     }
     catch(err){
        setUploadingImg(false)
        console.log(err)
     }
  }
  const handleChange=(e)=>{
    setSignUser(user=>({...user,[e.target.name]:e.target.value}))
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    if(!image){
      alert("Please provide a profile pic")
    }
    try{
      const url=await uploadImg(image)
      const res=await register({...signUser,profilePic:url})
      dispatch(setCredentials(res.data))
      navigate("/",{replace:true})
    }
    catch(err){
        console.log(err)
    }
  }
  return (
    // <div className="signupWrapper">
       <div className="register">
          <div className="card">
            <div className="left">
              <h1>Lama Social</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel corporis nam eveniet beatae? Eveniet, veritatis?.</p>
              <span>Do you have an account?</span>
              <Link to="/login" style={{textDecoration:"none",color:"inherit"}}>
                    <button>Login</button>
                </Link>
            </div>
            <div className="right">
              {isError && <span>{error.message}</span>}
                <h1>Register</h1>
                <div className="profileWrapper">
                  <img src={imagePreview?imagePreview:bot} alt="user"/>
                  <label htmlFor="profile">< Add sx={{cursor:"pointer",color:"white",zIndex:"2",fontSize:"16px"}}/></label>
                  <input type="file" accept='image/jpg image/jpeg image/png' onChange={addImage} hidden id="profile"/>
                </div>
                <form action="" onSubmit={handleSubmit}>
                  <input type="text" placeholder='Username' onChange={handleChange} value={signUser.username} name="username"/>
                  <input type="email" placeholder='Email'onChange={handleChange} value={signUser.email} name="email" />
                  <input type="password" placeholder='Password' onChange={handleChange} value={signUser.password} name="password"/>
                  <button>Register</button>
                  
                </form>
            </div>
          </div>
        </div>
       
  )
}

export default Signup
