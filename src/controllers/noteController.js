const noteModel = require("../models/note");
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;
//create note
const createNote = async (req,res)=>{
 
 const {title ,description} =req.body;
 const newNote = new noteModel({
    title:title,
    description:description,
    userId : req.userid

 });
 try{
    console.log( "try wali note controller",+req.userid);
    
    await newNote.save();
    res.status(201).json(newNote);
 }
 catch(error){
    console.log(error.message);
    res.status(500).json({message : "can,t create note"})
 };
}
//get note
const getNote =async (req,res)=>{
    try{
        const notes = await noteModel.find({userId : req.userId});
        res.status(200).json(notes);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ message : "something went wrong"});
    }

}
//update note

const updateNote = async (req,res)=>{
    const id =req.params.id;
    const {title ,description}=req.body;
    const newNote ={
        title :title,
        description :description,
        userId :req.userId
    }
    try{
        await noteModel.findByIdAndUpdate(id , newNote ,{new :true});
        res.status(200).json(newNote);
    } catch(error){
        console.log(error);
        res.status(500).json({message :"something went wrong"});
    }

}
// delete note

const deleteNote = async (req,res)=>{
    const id =req.params.id;
    try{
        const note = await noteModel.findByIdAndRemove(id);
        res.status(202).json(note);
    }catch(error){
        console.log(error);
        res.status(500).json({message :"something went wrong"});
    }


}

module.exports ={
    getNote,
    createNote,deleteNote,updateNote


}