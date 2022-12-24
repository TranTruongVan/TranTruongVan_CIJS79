import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppProvider';
import { v4 as uuid } from 'uuid';
import FormExpense from './FormExpense';

export default function Header() {
  const [isAdding, setIsAdding] = useState(false);
  const {
    inputValues: { name, amount, date },
    resetInputValues,
    setExpenses
  } = useContext(AppContext);


  function handleSubmit(type) {
    setIsAdding(false)
    if (type === "add") {
      setExpenses((prev) => ([
        ...prev,
        {
          id: uuid(),
          name,
          date,
          amount: `$ ${amount}`
        }
      ]))
    }
    resetInputValues();
  }

  return (
    <div className="w-[500px] md:w-[800px] py-6 px-8 bg-purple-primary rounded-md mx-auto max-w-[90%] flex justify-center items-center mt-8">
      {
        isAdding ?
          <FormExpense onSubmit={handleSubmit}>
            <div
              className="btn bg-purple-secondary text-white mr-4"
              onClick={() => handleSubmit("add")}>
              ADD
            </div>
          </FormExpense>
          :
          <div
            className="btn bg-purple-secondary text-white min-w-[220px]"
            onClick={() => { setIsAdding(true) }}>
            ADD NEW EXPENSE
          </div>
      }
    </div>
  )
}

