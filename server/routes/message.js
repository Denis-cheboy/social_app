const {Router}=require("express")
const { createMessage, getMessages } = require("../controllers/message")

const router=Router()

router.post("/",createMessage)
router.get("/:conversationId",getMessages)

module.exports=router