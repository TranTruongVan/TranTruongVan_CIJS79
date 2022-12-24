import React, { useState } from 'react'
import Header from './Header'
import ExpenseContainer from './ExpenseContainer'
import EditExpenseScreen from './EditExpenseScreen'



export default function App() {
  const [isEditing, setIsEditing] = useState(false)
  return (
    <div className="relative">
      <Header />
      <ExpenseContainer setIsEditing={setIsEditing} />
      {isEditing && <EditExpenseScreen setIsEditing={setIsEditing} />}
    </div>
  )
}
