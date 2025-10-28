import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

const SummaryExp=({ expenses })=> {
  //calculate totle expenses 
  const total = useMemo(() => expenses.reduce((s, e) => s + Number(e.amount), 0), [expenses]);
 
  //separate and calculate expense by using category
  const categoryMap = useMemo(() => {
    return expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + Number(e.amount);
      return acc;
    }, {});
  }, [expenses]);
 
  //set labels and datavalues
  const labels = Object.keys(categoryMap);
  const dataValues = Object.values(categoryMap);

  const data = {
    labels,
    datasets: [{ data: dataValues,
        backgroundColor:[
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        ],
        borderWidth:1,
     }]
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="text-lg font-medium">Summary</h3>
      <p className="text-2xl font-bold mt-2">₹{total.toFixed(2)}</p>
      <div className="mt-4">
        {labels.length>0 ? <Doughnut data={data} /> : <p className="text-sm text-slate-600">No data for chart</p>}
      </div>
      <div className="mt-4">
        {labels.map((cat)=> (
          <div key={cat} className="flex justify-between text-sm">
            <span>{cat}</span>
            <span>₹{categoryMap[cat].toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SummaryExp;