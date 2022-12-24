import React, { useState, useEffect } from 'react'

export default function App() {
  const [wordCounter, setWordCounter] = useState();
  const [text, setText] = useState("");


  useEffect(() => {
    const timer = setTimeout(() => {
      setWordCounter(text !== "" ? text.trim().replace(/\s+/g, " ").split(" ").length : 0);
    }, 500)

    return () => clearTimeout(timer)

  }, [text])


  return (
    <div className="w-full p-4">
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        className="w-full border border-black p-4"
        name=""
        id=""
        rows="10"
        placeholder="Enter words here..."
      ></textarea>
      <div>{`Word(s): `} {wordCounter}</div>
    </div >
  )
}
