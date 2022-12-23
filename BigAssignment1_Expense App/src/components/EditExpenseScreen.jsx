import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider';
import FormExpense from './FormExpense';

export default function EditExpenseScreen(props) {
  const {
    inputValues: { name, amount, date },
    resetInputValues,
    setExpenses,
    expenseEditingId
  } = useContext(AppContext);


  function handleSubmit(type) {
    props.setIsEditing(false)
    if (type === "save") {
      setExpenses((prev) => prev.map((expense) => {
        if (expense.id !== expenseEditingId)
          return expense;
        return {
          id: expenseEditingId,
          name,
          amount: `$ ${amount}`,
          date
        }
      }))
    }
    resetInputValues();
  }


  return (
    <div className="fixed top-0 z-30 bg-[#ffffff80] w-screen h-screen flex justify-center items-center">
      <div className="w-[300px] md:w-[600px] py-6 px-8 bg-purple-primary rounded-md max-w-[90%] flex justify-center items-center mt-8 -translate-x-2">
        <FormExpense onSubmit={handleSubmit}>
          <div
            className="btn bg-purple-secondary text-white mr-4"
            onClick={() => handleSubmit("save")}>
            SAVE
          </div>
        </FormExpense>
      </div>
    </div >
  )
}
