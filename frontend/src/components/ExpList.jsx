import { useState } from "react"
import ExpenseForm from "./ExpenseForm";


const ExpList = ({expenses,deleteExp,update}) => {
  const [editingId,setEditingId]=useState(null);
  const startEdit=(id) => setEditingId(id);
  return (
    <div className='mt-4'>
       {expenses.length === 0 && <p>No Expenses...</p>}
       <ul className='space-y-3'>
         {expenses.map((exp)=>(
            <li key={exp._id} className="bg-white p-3 rounded shadow flex justify-between items-start">
            <div>
              <div className="font-semibold">{exp.title}</div>
              <div className="text-sm text-slate-600">{exp.category} • {new Date(exp.date).toLocaleDateString()}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">₹{exp.amount}</div>
              <div className="mt-2 space-x-2">
                <button onClick={()=> startEdit(exp._id)} className="text-indigo-600 text-sm">Edit</button>
                <button onClick={()=> deleteExp(exp._id)} className="text-red-600 text-sm cursor-pointer">Delete</button>
              </div>
            </div>
            {editingId === exp._id ? (
              <div className="w-full mt-3">
                <ExpenseForm initial={exp} onUpdate={(id,expense)=> { update(id,expense); setEditingId(null);} } />
              </div>
            ):<></>}
          </li>
         ))

         }
       </ul>

    </div>
  )
}

export default ExpList