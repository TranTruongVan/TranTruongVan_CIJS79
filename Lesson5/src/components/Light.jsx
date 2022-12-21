import React from 'react'

export default function Light(props) {
  return (
    <div className={`m-2 w-12 h-12 rounded-full border border-black ${props.isLighting && `bg-${props.color}-500`}`}>
    </div>
  )
}
