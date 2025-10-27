import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true,
        minlength:8,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}/,
        "Password Must be Atleast of 8 Character contain Upper letter, lower letters and symbols also"],
    },
    expenses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Expense"
    }
    ]
});

const User=mongoose.model('User',UserSchema);

export default User;