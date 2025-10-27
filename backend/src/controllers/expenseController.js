import Expense from "../model/Expense.js";
import User from "../model/User.js";

export const createExpense = async (req, res) => {
  try {
    const { title, amount, category ,date} = req.body;
    const userId=req.userId;
    if (!title || amount === undefined || !category || !date) {
      return res
        .status(400)
        .json({ error: "title, amount, category and date are required" });
    }

    if (isNaN(Number(amount)) || Number(amount) < 0) {
      return res
        .status(400)
        .json({ error: "amount must be a positive number" });
    }
   
    const expense=await Expense.create({
        title,
        amount,
        category,
        date:new Date(date),
        userId,
    });

    await expense.save();
    const user=await User.findById(userId);
    user.expenses.push(expense._id);
    await user.save();
    res.status(200).json(expense);

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllExpense= async(req,res)=>{
    try {
        const userId=req.userId;
        const expenses=await Expense.find({userId:userId}).sort({date:-1});      
        if(!expenses){
            res.status(404).json({message:"Expenses Not Found"});
        }   
        res.status(200).json(expenses);
    } catch (error) {
         res.status(500).json({error:'Server Error'})
    }
}

export const deleteExpense=async(req,res)=>{
  try {
     const {id}=req.params;
    const removeExpense=await Expense.findByIdAndDelete(id);
    if(!removeExpense){
      res.status(404).json({message:'Expense Not Found'});
    }
    res.status(200).json({message:" Expense Deleted ",id:removeExpense._id});
    
  } catch (error) {
    res.status(500).json({error:"Server Error"})
  }
}

export const updateExpense = async(req,res)=>{
  try {
    const {id}=req.params;
    const {title,amount,category,date}=req.body;
    const expense=await Expense.findById(id);
    if(!expense){
      res.status(404).json({message:"Expense not found"})
    }
    expense.title=title || expense.title;
    expense.amount=amount || expense.amount;
    expense.category=category || expense.category;
    expense.date=date || expense.date;
    await expense.save();
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({error:"Server Error"});
  }
}