import React, { useState, useEffect } from "react"



export const AppContext = React.createContext()

export default function AppProvider({ children }) {
  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [optionalLanguage, setOptionalLanguage] = useState("vi");

  const words = {
    vi: {
      login: "Đăng nhập",
      username: "Tên người dùng",
      welcome: "Xin Chào"
    },
    eng: {
      login: "Login",
      username: "Username",
      welcome: "Welcome"
    }
  }

  useEffect(() => { console.log(optionalLanguage); }, [optionalLanguage])

  return (
    <AppContext.Provider value={{
      username,
      setUsername,
      isLogged,
      setIsLogged,
      optionalLanguage,
      setOptionalLanguage,
      words: words[optionalLanguage]
    }}>
      {children}
    </AppContext.Provider>
  )
}

