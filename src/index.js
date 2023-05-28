const express =require("express");
const bodyParser =require("body-parser");//to take input from html forms
const noteRouter = require("./routes/noteRoutes");
const userRouter = require("./routes/userRoutes");
const doubtRouter = require("./routes/doubtRoutes");
const path = require('path');

const app =express();
app.use(express.static("public"))
const mongoose= require("mongoose");
app.use(express.json());
//defining middleware
// app.use((req,res,next)=>{
    //console.log("HTTP METHOD"+ req.method +"url"+ req.url );
   // next();
// })
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;
app.set('view engine','ejs')//view engine 
app.set('views', path.join(__dirname, 'views'));



app.use("/users",userRouter);
app.use("/note",noteRouter);
app.use("/doubt",doubtRouter);
app.get("/",(err,res)=>{
    res.render('register',{title : 'creative arushi'});
});
const PORT =process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server started at port no. ",+PORT);
   });

})
.catch((error)=>{
    console.log(error);
})

