import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider';

export default function FormExpense(props) {
  const { inputValues: { name, amount, date } } = useContext(AppContext);
  return (
    <form
      onSubmit={e => { e.preventDefault() }}
      className="flex flex-col w-full">
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
        {props.children}
        <div
          className="btn bg-slate-300 text-gray-600"
          onClick={() => props.onSubmit("cancel")}>
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
      <div className="text-white font-bold w-28">{props.name}</div>
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
