const {Router}=require("express")
const { createPost, deletePost, getPost, getPosts, updatePost, likePost, postLikes } = require("../controllers/post")

const router=Router()

router.post("/:id",createPost)

router.delete("/:id/:userId",deletePost)
router.get("/:id",getPost)
router.get("/",getPosts)
router.put("/:id",updatePost)
router.put("/like/:id",likePost)
router.get("/likes/count/:id",postLikes)

module.exports=router