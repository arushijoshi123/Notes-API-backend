const express =require("express");
const userController= require("../controllers/userController");
const userRouter = express.Router();
userRouter.post("/signup",userController.signup);
userRouter.post("/signin",userController.signin);
userRouter.delete("/:id",userController.deleteUser);
module.exports = userRouter;