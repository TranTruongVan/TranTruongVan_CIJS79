import React, { useContext, useState } from 'react'
import { AppContext } from '../contexts/AppProvider';

export default function Header() {

  const [isAdding, setIsAdding] = useState("false")

  return (
    <div className="w-[500px] md:w-[800px] py-6 px-8 bg-purple-primary rounded-md mx-auto max-w-[90%] flex justify-center items-center mt-8">
      {
        isAdding === "true"
          ? <FormExpense setIsAdding={setIsAdding} />
          : <div className="btn bg-purple-secondary text-white min-w-[220px]"
            onClick={() => { setIsAdding("true") }}>
            ADD NEW EXPENSE
          </div>
      }
    </div>
  )
}

function FormExpense(props) {
  const { inputValues: { name, amount, date } } = useContext(AppContext);


  function handleSubmit(type) {
    console.log(type);
    props.setIsAdding("false")
    if (type === "add")
      console.log("bjfdbjsfdbfd");
  }


  return (
    <form onSubmit={e => { e.preventDefault() }} className="flex flex-col w-full">
      <Input
        placeholder="Enter name here..."
        type="text"
        value={name}
        name="Name" />
      <Input
        placeholder="Enter amount here..."
        type="text"
        value={amount}
        name="Amount" />
      <Input
        type="date"
        value={date}
        name="Date" />
      <div className="flex justify-end items-center mt-4">
        <div
          className="btn bg-purple-secondary text-white mr-4"
          onClick={() => handleSubmit("add")}>
          ADD
        </div>
        <div
          className="btn bg-slate-300 text-gray-600"
          onClick={() => handleSubmit("cancel")}>
          CANCEL
        </div>
      </div >
    </form>
  )
}

function Input(props) {
  const { setInputValues } = useContext(AppContext);


  function handleChange(e) {
    setInputValues((prev) => ({
      ...prev,
      [e.target.name.toLowerCase()]: e.target.value
    }))
  }


  return (
    <label className="flex justify-between items-center my-2">
      <div className="text-white font-bold w-[50px]">{props.name}</div>
      <input
        onChange={handleChange}
        value={props.value}
        name={props.name}
        className="flex-1 max-w-[550px] py-2 px-4 rounded-md"
        type={props.type}
        placeholder={props.placeholder}
      />
    </label>
  )
}