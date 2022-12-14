import React from 'react'

export default function Item(props) {
  return (
    <label className="block">
      <input className="mr-4" type="checkbox" />
      {props.item}
    </label>
  )
}
