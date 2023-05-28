const mongoose = require("mongoose");
const DoubtSchema = mongoose.Schema({
    topic:{
        type : String,
        required : true

    },
    question:{
        type :String,
        required :true
    },
    solution:{
        type :String,
        required :false
    },
    studentid:{
        type :mongoose.Schema.Types.ObjectId,
        ref : "User",
        required :true
    },
    email :{
        type :String,
        required :true
    }
},{timestamps :true});
module.exports =mongoose.model("Doubt",DoubtSchema);
