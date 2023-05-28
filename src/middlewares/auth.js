const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;
const auth =(req, res ,next)=>{
    try{
        let token = req.headers.authorization;
        if(token){
            console.log("HTTP METHOD"+ req.method +"url"+ req.url );
            token = token.split(" ")[1];
            console.log(token);
            let user = jwt.verify(token ,SECRET_KEY);
            console.log("user ko log krao",+user);
            
            req.userid = user.userId;
            console.log("auth wali ",+ user.userId);
            emailidofuser = user.email;
            req.emailId = emailidofuser;

           

        }
        else{
            console.log(token);
            res.status(401).json({message :"jaakr token to laa pehle ......"});
        }
        next();

    }
    catch(error){
        console.log(error.message);
        console.log(token);
        res.status(401).json({message :"tera token hi jhooota haii....."});
    }


}
module.exports =auth;