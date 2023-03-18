import { createContext,useContext,useState,useEffect, useMemo } from "react";
import io from "socket.io-client"

const socket=io("https://social-app-api-et09.onrender.com")
const AppContext=createContext()

export const AppContextProvider=({children})=>{
    const [darkMode,setDarkmode]=useState(JSON.parse(localStorage.getItem("darkMode")) || false)

    useEffect(()=>{
       localStorage.setItem("darkMode",JSON.stringify(darkMode))  
    },[darkMode])

    const toggle=()=>{
        setDarkmode(!darkMode)
    }

    const [messages,setMessages]=useState([])
    const [user,setUser]=useState(null)
    const [currentRoom,setCurrentRoom]=useState(null)
    const [conversations,setConversations]=useState([])
    const [currentConversation,setCurrentConversation]=useState(null)
    const [privateMemberMsg,setPrivateMemberMsg]=useState(null)
    const [members,setMembers]=useState([])
    const [timelinePosts,setTimelinePosts]=useState(null)


    return(
        <AppContext.Provider 
        value={{
            messages,setMessages,
            socket,
            user,setUser,
            conversations,setConversations,
            currentRoom,setCurrentRoom,
            currentConversation,setCurrentConversation,
            privateMemberMsg,setPrivateMemberMsg,
            members,setMembers,toggle,darkMode,
            timelinePosts,setTimelinePosts,
            }}>
                {children}

        </AppContext.Provider>
    )
}

export const useApp=()=>{
    return useContext(AppContext)
}