import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import LeftBar from "./leftBar/LeftBar";
import Rightbar from "./rightBar/Rightbar";
import { Navigate } from "react-router-dom";
import "../style.scss"
import { useApp } from "../context/appContext";
const Layout=()=>{
    const currentUser=true
    const {darkMode}=useApp()
    const ProtectedRoute=({children})=>{
        if(!currentUser){
          return <Navigate to="/login"/>
        }
        return children
  }
    return (
        <div className={`theme-${darkMode?"dark":"light"}`}>
          <Header/>
          <div style={{display:"flex"}}>
              <LeftBar/>
              <ProtectedRoute>
                  <div style={{flex:6}}>
                    <Outlet/>
                  </div>
              </ProtectedRoute>
              <Rightbar/>
          </div>
        </div>
    )
}

export default Layout