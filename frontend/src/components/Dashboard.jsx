import { useEffect, useState } from 'react'
import * as apiClient from "../apiClient";
import ExpList from './ExpList';
import ExpenseForm from './ExpenseForm';
import SummaryExp from './SummaryExp';

const Dashboard = () => {
    const [expenses,setExpenses] = useState([]);
    const [loading,setLoading]=useState(false);

    const load=async()=>{
        setLoading(true);
        try{
            const data=await apiClient.getAllExpenses();
            setExpenses(data);
        }finally{
         setLoading(false);
        }
    };
    useEffect(()=>{
        load();
    },[]);
   
    const addExp= async(expense)=>{
      const add=await apiClient.addExpense(expense);
      
      setExpenses(prev => [add,...prev]);
    };
    
    const removeExp=async(id)=>{
      await apiClient.deleteExpense(id);
      setExpenses(prev => prev.filter(e =>e._id !== id));
    }
   
    const updateExp=async(id,expense)=>{
         const updated = await apiClient.updateExpense(id,expense);
         setExpenses(prev => prev.map(e=> e._id === id ? updated:e));
    }
  return (
    <div>
        <div className="grid md:grid-cols-2 gap-4">
        <ExpenseForm addExp={addExp}/>
        <SummaryExp expenses={expenses}/>
      </div>
         <div className="mt-6">
        <h2 className="text-xl font-semibold">Expenses</h2>
        {loading ? <p>Loading...</p> : (
          <ExpList expenses={expenses} deleteExp={removeExp} update={updateExp}/>
        )}
      </div>
    </div>
  )
}

export default Dashboard