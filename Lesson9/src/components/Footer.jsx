import React, { useContext } from 'react'
import { AppContext } from '../contexts/AppProvider'

export default function Footer() {
  const { optionalLanguage, setOptionalLanguage } = useContext(AppContext)
  return (
    <div className="fixed bottom-0 bg-gray-300 w-full py-4 flex justify-center items-center">
      <select
        className="rounded-md"
        value={optionalLanguage}
        onChange={e => { setOptionalLanguage(e.target.value) }}>
        <option value="eng">English</option>
        <option value="vi">Vietnamese</option>
      </select>
    </div>
  )
}
