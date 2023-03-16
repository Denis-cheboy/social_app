const connectDB=require("./dbConnection")
const cors=require("cors")
const Message=require("./models/Message")
const authRoute=require("./routes/auth")
const errorHandler=require("./errorHandler")
const userRoute=require("./routes/users")
const messageRoute=require("./routes/message")
const conversationRoute=require("./routes/conversation")
const commentRoute=require("./routes/comment")
const mongoose=require("mongoose")
const postRoute=require("./routes/post")
const express=require("express")
const Conversation = require("./models/Conversation")

const PORT=process.env.PORT || 3500

// database connection
connectDB()

const app=express()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// routes
app.use("/api/users",userRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/comments",commentRoute)

// error handler
app.use(errorHandler)

// io server

const users=[]

const addUser=(userId,socketId)=>{
    if(!users.some(user=>user.userId===userId)) users.push({userId,socketId})
}

const removeUser=(socketId)=>{
    return users.filter(user=>user.socketId!==socketId)
}
const getRoomMessages=async(conversationId)=>{
    const messages=await Message.find({
        conversationId:conversationId
    })
    return messages
}
const server=require("http").createServer(app)
const io=require("socket.io")(server,{
    cors:{
        origin:["http://localhost:3000"]
    }
})

io.on("connection",(socket)=>{
       socket.on("join-room",async(room)=>{
         socket.join(room)
         const roomMessages=await getRoomMessages(room)
         io.to(room).emit("room-messages",roomMessages)
       })
       socket.on("new-message",async(message)=>{
        const newMessage=await Message.create({
            content:message.content,
            from:message.from,
            conversationId:message.conversationId
        })
        const roomMessages=await getRoomMessages(message.conversationId)
        io.to(message.conversationId).emit("room-messages",roomMessages)
       })
       socket.on("new-user",(userId,socketId)=>{
          addUser(userId,socketId)
          io.emit("members",users)
       })
       socket.on("create-conversation",async(receiverId,senderId)=>{
          const newConversation=await Conversation.create({
            members:[receiverId,senderId]
          })
          const conversations=await Conversation.find({
            members:{$in:senderId}
          })
          socket.emit("conversations",conversations,newConversation)

       })
       socket.on("disconnect",(socket)=>{
        console.log("disconnected")
        removeUser(socket.id)
        io.emit("members",users)
       })
})

mongoose.connection.once("connected",()=>{
    console.log("Connected to the database")
    server.listen(PORT,()=>console.log("Application running on port",PORT))
})

