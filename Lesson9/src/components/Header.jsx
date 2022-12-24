import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider'

export default function Header() {
  const { username, isLogged, words } = useContext(AppContext)
  return (
    <div className="bg-gray-300 py-2 fixed top-0 w-full">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div>MindX</div>
        <div>{isLogged ? `${words.welcome} , ${username}` : `${words.login}`}</div>
      </div>
    </div>
  )
}
