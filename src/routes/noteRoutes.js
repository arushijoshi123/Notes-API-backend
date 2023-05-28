const express =require("express");
const auth = require("../middlewares/auth");
const noteController = require("../controllers/noteController");
const noteRouter =express.Router();

noteRouter.get("/",auth,noteController.getNote);
noteRouter.post("/",auth,noteController.createNote);
noteRouter.delete("/:id",auth,noteController.deleteNote);
noteRouter.put("/:id",auth,noteController.updateNote);

module.exports = noteRouter;