import React, { useEffect, useState } from "react"
import { v4 as uuid } from 'uuid';


export const AppContext = React.createContext()

export default function AppProvider({ children }) {
  const [year, setYear] = useState(`2022`);
  const [expenseEditingId, setExpenseEditingId] = useState();
  const [inputValues, setInputValues] = useState({
    name: "",
    amount: "",
    date: ""
  });
  const [expenses, setExpenses] = useState(
    [
      {
        id: uuid(),
        name: "Some Books",
        amount: "$ 50",
        date: "2022-01-16"
      },
      {
        id: uuid(),
        name: "Electricity Bill",
        amount: "$ 75",
        date: "2022-10-10"
      },
      {
        id: uuid(),
        name: "New Bike",
        amount: "$ 100",
        date: "2022-05-08"
      }
    ]
  )
  const [chartData, setChartData] = useState([{
    month: "Jan",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Feb",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Mar",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Apr",
    percentage: "0",
    amount: "0"
  },
  {
    month: "May",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Jun",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Jul",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Aug",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Sep",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Oct",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Nov",
    percentage: "0",
    amount: "0"
  },
  {
    month: "Dec",
    percentage: "0",
    amount: "0"
  }]);


  useEffect(() => {
    let amountEveryMonths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    expenses.forEach(expense => {
      const yearExpense = expense.date.split("-")[0];
      if (yearExpense === year) {
        const amount = Number(expense.amount.split(" ")[1]);
        const month = expense.date.split("-")[1];
        amountEveryMonths[month - 1] += amount
      }
    })

    let maxAmount = Math.max(...amountEveryMonths);

    setChartData((prev) => {
      return prev.map((data, index) => ({
        ...data,
        amount: String(amountEveryMonths[index]),
        percentage: maxAmount !== 0 ? String(amountEveryMonths[index] / maxAmount * 100) : "0"
      }))
    })

  }, [year, expenses])


  function resetInputValues() {
    setInputValues({
      name: "",
      amount: "",
      date: ""
    })
  }

  return (
    <AppContext.Provider value={{
      inputValues,
      setInputValues,
      resetInputValues,
      year,
      setYear,
      expenses,
      setExpenses,
      chartData,
      expenseEditingId,
      setExpenseEditingId
    }}>
      {children}
    </AppContext.Provider>
  )
}

