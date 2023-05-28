const userModel = require("../models/user");
const doubtModel = require("../models/doubt");
const noteModel = require("../models/note");
const dotenv = require("dotenv");
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    //Existing user check
    //hashed password
    //user creation 
    //token generate
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        //hash
        const hashedPassword = await bcrypt.hash(password, 10);

        //user create
        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        console.log("useranme ",username);
        
        //token
        const token = jwt.sign({ email: result.email, userId: result._id }, SECRET_KEY);
       // res.status(201).json({ user: result, token: token });
        
      const title =  res.status(202).json({message :"New user created successfully !!!!"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "something went wrong" });

    }


}
//delete user
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const duser = await userModel.findByIdAndRemove(id);
        const dnotes = await noteModel.deleteMany({userId : id});
        const ddoubts = await doubtModel.deleteMany({studentid : id});
        res.status(202).json({message :"user deleted successfully notes and dbt also"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }


}


const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email: email });
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" });
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password);
        if (!matchPassword) {
            return res.status(400).json({ message: "invalid credentials" });
        }
        //token
        const token = jwt.sign({ email: existingUser.email, userId: existingUser._id }, SECRET_KEY);
       //res.status(201).json({ user: existingUser, token: token });
        res.status(400).json({ message: "user logged in successfully !!!" });




    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "something went wrong" });


    }

}



module.exports = { signin, signup ,deleteUser};