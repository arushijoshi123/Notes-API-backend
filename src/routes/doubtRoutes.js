const express =require("express");
const auth = require("../middlewares/auth");
const doubtController = require("../controllers/doubtController");
const doubtRouter =express.Router();

//creating doubt
doubtRouter.post("/",auth,doubtController.createDoubt);
doubtRouter.put("/:id",auth,doubtController.updateDoubt);
doubtRouter.get("/:id",auth,doubtController.getDoubt);
doubtRouter.delete("/:id",auth,doubtController.deleteDoubt);
module.exports = doubtRouter;