import Add from '@mui/icons-material/Add'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useApp } from '../../context/appContext'
import { selectCurrentUser } from '../../features/authSlice'
import "./CreatePost.css"

const CreatePost = ({setOpen,setPosts}) => {
    const user=useSelector(selectCurrentUser)
    const [image,setImage]=useState("")
    const [uploading,setUploading]=useState(false)
    const [imagePreview,setImagePreview]=useState("")
    const [postContent,setPostContent]=useState({
        content:"",
        postPhoto:"",
    })
    const addPhoto=(e)=>{
        const file=e.target.files[0]
        if(file.size>108466346){
            alert("File must be less or equal to 1mb")
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
            setUploading(true)
            const res=await axios.post("https://api.cloudinary.com/v1_1/dwzcawi1h/image/upload",data)
            setUploading(false)
            return res.data.url
        }
        catch(err){
            setUploading(false)
            console.log(err)
        }
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
        try{
          const url=await uploadImg(image)
          const data={...postContent,postPhoto:url,userId:user._id}
          const res=await axios.post(`https://social-app-api-et09.onrender.com/posts/${user._id}`,data)
          setPosts(posts=>[...posts,res.data])
          setOpen(false)
        }
        catch(err){
            console.log(err)
        }
       
    }
  return (
    <div className="createPost">
        <h3>Create Post</h3>
        <div className="postDesc">
            <textarea rows={4} cols={4} placeholder="write a post" value={postContent.content} onChange={(e)=>setPostContent(contents=>({...contents,content:e.target.value}))}/>
        </div>
        <div className="postImage">
            {imagePreview && <img src={imagePreview} alt=""/>}
            <label htmlFor='add' className='add'>AddPhoto</label>
            <input type="file" hidden id="add" accept='image/jpg image/jpeg image/png' onChange={addPhoto}/>
        </div>
        <div className="createButtons">
            <button onClick={handleSubmit} className="submit">Submit</button>
            <button className="cancel" onClick={()=>setOpen(false)}>Cancel</button>
        </div>
    </div>
  )
}

export default CreatePost
