import React from 'react'
import "./Stories.scss"
import { useSelector } from 'react-redux'
import bot from "../../photos/botPhoto.jpg"
import { selectCurrentUser } from '../../features/authSlice'

const Stories = () => {
  const user=useSelector(selectCurrentUser)
  // temporary stories data
  const stories=[
     {
      id:1,
      name:"John Doe",
      img:bot
     },
     {
      id:2,
      name:"Susan Kihika",
      img:bot
     },
     {
      id:4,
      name:"Kenneth",
      img:bot
     },
     {
      id:5,
      name:"JJane Doe",
      img:bot
     },
  ]
  return (
    <div className='stories'>
      <div className="story">
          <img src={bot} alt=""/>
          <span>{user?.username}</span>
          <button>+</button>
      </div>
        {
          stories.map(story=>(
            <div className="story" key={story.id}>
              <img src={story.img} alt=""/>
              <span>{story.name}</span>
            </div>
          ))
        }
    </div>
  )
}

export default Stories
