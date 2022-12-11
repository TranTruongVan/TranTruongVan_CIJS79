import React from 'react'

export default function Contact(props) {
  const { name, number } = props.contact;
  return (
    <div className="mb-3 rounded-lg py-2 px-4 flex justify-between items-center bg-gray-200">
      <div>{name}</div>
      <div>{number}</div>
    </div>
  )
}
