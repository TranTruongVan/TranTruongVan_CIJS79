import React, { useState } from 'react'
import Light from './Light'

export default function App() {
  const [currentLightning, setCurrentLightning] = useState("red");


  function handleChangeLight() {
    const mapChangeLight = {
      red: "yellow",
      yellow: "green",
      green: "red"
    }
    setCurrentLightning(mapChangeLight[currentLightning]);
  }


  return (
    <div className="flex flex-col flex-center items-center mt-4">
      <button
        className="py-2 px-4 bg-black text-white rounded-md hover:opacity-50 mb-4"
        onClick={handleChangeLight}
      >
        Next
      </button>
      <div className="flex flex-center items-center">
        <Light color="red" isLighting={currentLightning === "red"} />
        <Light color="yellow" isLighting={currentLightning === "yellow"} />
        <Light color="green" isLighting={currentLightning === "green"} />
      </div>
    </div>
  )
}
