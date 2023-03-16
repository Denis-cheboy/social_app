import React, { useRef,useEffect, useState } from 'react'
import Conversation from '../../components/Conversation/Conversation'
import Message from '../../components/Message/Message'
import OnlineFriend from '../../components/OnlineFriend/OnlineFriend'
import { useApp } from '../../context/appContext'
import axios from "axios"

import "./Messenger.css"
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/authSlice'

const Messenger = () => {
    const user=useSelector(selectCurrentUser)
    const {currentConversation,conversations,setCurrentConversation,members,setMembers,setConversations,messages,setMessages,socket}=useApp()

    useEffect(()=>{
        socket.on("connect",()=>{
            socket.emit("new-user",user._id,socket.id)
        })
    },[])

    socket.off("members").on("members",(members)=>{
        setMembers(members)
    })
    const joinRoom=(conversation)=>{
        setCurrentConversation(conversation)
        // console.log(currentConversation)
        socket.emit("join-room",conversation._id)
        socket.on("room-messages",(allMessages)=>{
            setMessages(allMessages)
        })
    }
    const [message,setMessage]=useState("")
    const messageRef=useRef()

    useEffect(()=>{
        messageRef.current.scrollIntoView({behaviour:"smooth"})
    },[messages])

    useEffect(()=>{
        const fetchConversations=async()=>{
            try{
              const res =await axios.get(`http://localhost:3500/api/conversations/${user?._id}`)
              setConversations(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchConversations()
    },[user])

    const sendMessage=(e)=>{
        e.preventDefault()
        const data={
            content:message,
            from:user._id,
            conversationId:currentConversation._id
        }
       socket.emit("new-message",data)
       joinRoom(currentConversation)
    }
    const newMembersArray=members.filter(member=>member.userId!==user._id)

    const createConversation=(memberId)=>{
        const existsConverastion=conversations.some(conversation=>conversation.members.includes(memberId))
        const conversation=conversations.find(conversation=>conversation.members.includes(memberId))
        if(!existsConverastion){
            socket.emit("create-conversation",memberId,user._id)
            socket.on("conversations",(conversations,createdConversation)=>{
                setConversations(conversations)
                joinRoom(createdConversation)
            })
        }
        else{
          joinRoom(conversation)
        }
       
    }

    
  return (
    <div className="messenger">
        <div className="conversationWrapper">
            <div className="conversation">
                <div className="topConversation">
                    <input className="topInput" placeholder='Search for Your friends'/>
                </div>
                <div className="bottomConversation">
                    <span className="conversationHeader">Available Conversations</span>
                    {!conversations && <p>No Available Conversation</p>}
                    <div className="allConversation">
                        {conversations?.map(conversation=>(
                            <div className="oneConversation"  onClick={()=>joinRoom(conversation)} key={conversation._id}>
                                <Conversation conversation={conversation}/>
                            </div>
                        ))}
                    </div>
                   
                </div>
            </div>
        </div>
        <div className="messageWrapper">
            <div className="messageTop">
                <div className="messageBox">
                    {!currentConversation && <p>Open to Start a conversation</p>}
                    {messages?.map(message=>(
                        <Message message={message} key={message._id}/>
                    ))}
                    <div ref={messageRef}></div>
                    
                </div>
            </div>
            <form className="messageBottom" onSubmit={sendMessage}>
                <textarea disabled={!currentConversation} className="messageInput" placeholder='Write Message' value={message} onChange={(e)=>setMessage(e.target.value)}></textarea>
                <button className="sendMessage" disabled={!currentConversation}>Send</button>
            </form>
        </div>
        <div className="onlineFriendWrapper">
            <div className="onlineWrapper">
                <span className="onlineHead">Online friends</span>
                {newMembersArray.length===0 && <p>No online member</p>}
                <div className="members">
                    {newMembersArray.map((member)=>(
                        <div className="aFriend" onClick={()=>createConversation(member.userId)} key={member.socketId}>
                            <OnlineFriend member={member}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Messenger
