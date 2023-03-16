const {Router}=require("express")
const { getUsers, getUser, updateUser, deleteUser, timeline, friendShip } = require("../controllers/users")

const router=Router()

router.get("/",getUsers)
router.get("/:id",getUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)

router.get("/timeline/:userId",timeline)
router.put("/follow/:friendId",friendShip)

module.exports=router