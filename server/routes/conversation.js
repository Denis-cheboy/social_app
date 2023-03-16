const { createConversation, getConversations } = require("../controllers/conversation")

const {Router}=require("express")

const router=Router()

router.post("/",createConversation)
router.get("/:userId",getConversations)

module.exports=router