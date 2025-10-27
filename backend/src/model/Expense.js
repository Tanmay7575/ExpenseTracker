import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true,
        trim: true
    },
    amount:{
        type:Number,
        require:true
    },
    category:{
        type:String,
        require:true,
        min:0
    },
    date:{
        type:Date,
        require:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    }
},{timestamps:true});

const Expense=mongoose.model('Expense',ExpenseSchema);

export default Expense;