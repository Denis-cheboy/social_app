const { getComment, getComments, updateComment, deleteComment, createComment, getCommentsByPost, getCommentByUsers } = require("../controllers/comment")

const {Router}=require("express")

const router=Router()

router.get("/",getComments)

router.get("/postComments/:id",getCommentsByPost)

router.get("/commentsByusers/users/:id",getCommentByUsers)

router.put("/:id",updateComment)

router.delete("/:commentId/:postId",deleteComment)

router.post("/:id",createComment)

module.exports=router