import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider'

export default function Main() {
  const { username, isLogged, words } = useContext(AppContext)
  return (
    <div>
      {isLogged ?
        <div className="font-bold text-5xl text-center mt-12">{words.welcome}, {username}</div>
        :
        <FormLogin />
      }

    </div>
  )
}


function FormLogin() {
  const { username, setUsername, setIsLogged, words } = useContext(AppContext);


  return (
    <form
      onSubmit={() => { setIsLogged(true) }}
      className="border border-black rounded-md mt-36 mx-auto w-[500px]">
      <div className="text-center bg-gray-300 text-xl py-3 px-6 rounded-t-md">{words.login.toUpperCase()}</div>
      <div className="px-4 flex justify-center items-center flex-col">
        <input
          className="border border-black my-8 w-[90%] rounded-md text-center py-1 px-2"
          type="text"
          onChange={(e) => { setUsername(e.target.value) }}
          value={username}
          placeholder={`${words.username}...`}
        />
        <div
          className="mb-4 bg-blue-600 text-white rounded-md py-2 px-4 text-lg cursor-pointer hover:opacity-50"
          onClick={() => { setIsLogged(true) }}>{words.login}</div>
      </div>
    </form>
  )
}
