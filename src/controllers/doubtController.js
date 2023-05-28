const auth = require("../middlewares/auth");
const doubtModel = require("../models/doubt");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;
//create doubt
const createDoubt = async (req,res)=>{
 
 const {topic,question} =req.body;
 const newDoubt = new doubtModel({
    
    topic:topic,
    question:question,
    email :req.emailId,
    studentid :req.userid8S

 });
 try{
   
    await newDoubt.save();
    res.status(201).json(newDoubt);
 }
 catch(error){
    console.log(error);
    res.status(500).json({message : "Doubt m hi gbdb h"})
 };
}

//update doubt
const updateDoubt = async (req,res)=>{
    const id =req.params.id;
    const {topic ,question ,solution}=req.body;
    const newDoubt={
        topic:topic,
        question:question,
        studentid :req.userid,
        solution : solution,
    }
    try{
        await doubtModel.findByIdAndUpdate(id , newDoubt ,{new :true});
        res.status(200).json(newDoubt);
    } catch(error){
        console.log(error);
        res.status(500).json({message :"doubt update m gdbad h .........."});
    }

}
//get doubts of a particular student 
const getDoubt =async (req,res)=>{
    const stid =req.params.id;
    console.log(stid);
    try{
        const doubts = await doubtModel.find({userId : stid});
      //  console.log(doubts);
        res.status(200).json(doubts);
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ message : "doubts fetch nhi horeeee......."});
    }

}
//delete particular doubt

const deleteDoubt= async (req,res)=>{
    const id =req.params.id;
    //console.log(id);
    try{
        const doubt = await doubtModel.findByIdAndRemove(id);
        res.status(202).json(doubt);
        console.log("Above doubt got deleted Successfully.....!!!")
    }catch(error){
        console.log(error);
        res.status(500).json({message :"doubt delete nahi ho para"});
    }


}



//exporting 
module.exports ={
    
    createDoubt,updateDoubt ,getDoubt ,deleteDoubt

}