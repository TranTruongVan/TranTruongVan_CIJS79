import React, { useState } from "react"


export const AppContext = React.createContext()

export default function AppProvider({ children }) {
  const [inputValues, setInputValues] = useState({
    name: "",
    amount: "",
    date: ""
  });

  const [expense, setExpense] = useState(
    [
      {
        name: "Books",
        value: "$ 50",
        date: ""
      }, {
        name: "Books",
        value: "$ 50",
        date: ""
      }, {
        name: "Books",
        value: "$ 50",
        date: ""
      }, {
        name: "Books",
        value: "$ 50",
        date: ""
      }, {
        name: "Books",
        value: "$ 50",
        date: ""
      }
    ]
  )

  return (
    <AppContext.Provider value={{
      inputValues,
      setInputValues,
      expense
    }}>
      {children}
    </AppContext.Provider>
  )
}

