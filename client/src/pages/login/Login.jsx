import React, { useState } from 'react'
import { useLoginMutation } from '../../apiClient/apiSlice'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../features/authSlice'
import {Link, useNavigate} from "react-router-dom"
import "./Login.scss"
const Login = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [error,setError]=useState(null)
  const [login,{isLoading}]=useLoginMutation()
  const [loginUser,setLoginUser]=useState({
    email:"",
    password:""
  })
 const handleChange=(e)=>{
    setLoginUser(user=>({...user,[e.target.name]:e.target.value}))
 }
 const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const res= await login(loginUser)
      console.log(res)
      dispatch(setCredentials(res.data))
      navigate("/",{replace:true})
    }
    catch(err){
        setError(err)
    }
 }
  return (
      <div className="login">
        <div className="card">
          <div className="left">
             <h1>Hello World</h1>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum fuga similique, explicabo optio doloremque magni?</p>
             <span>Dont have an account</span>
             <Link to="/sign-up" style={{textDecoration:"none",color:"inherit"}}>
                  <button>Register</button>
             </Link>
          </div>
          <div className="right">
            {error && <span>{error.data.message}</span>}
              <h1>Login</h1>
              <form action="">
                <input type="text" placeholder='Email' onChange={handleChange} value={loginUser.email} name="email" />
                <input type="password" placeholder='password' onChange={handleChange} value={loginUser.password} name="password"  />
                <button onClick={handleSubmit} type="submit">{isLoading?"signing in":"Login"}</button>
              </form>
          </div>
        </div>
      </div>
    
  )
}

export default Login
