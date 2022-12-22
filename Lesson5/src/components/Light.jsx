import React from 'react'

export default function Light(props) {
  return (
    <div
      style={{
        backgroundColor: props.isLighting && props.color
      }}
      className="m-2 w-12 h-12 rounded-full border border-black">
    </div>
  )
}
