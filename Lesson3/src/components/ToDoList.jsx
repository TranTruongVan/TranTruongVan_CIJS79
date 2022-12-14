import React from 'react'
import Item from './Item'

const items = ["Clean up bedroom", "Buy some milk", "Jogging", "Learn React", "Doing Exercise"];

export default function ToDoList() {
  return (
    <div className="p-4 w-96">
      <input
        className="border-b border-b-black outline-none py-1 px-3 text-xl w-full mb-4"
        type="text"
        placeholder="Enter your task here..."
      />
      {items.map(item => {
        return <Item key={item} item={item} />
      })}
      <div className="flex justify-between items-center mt-6">
        <div>{items.length} tasks left!</div>
        <div>MindX todolist</div>
      </div>
    </div>
  )
}
