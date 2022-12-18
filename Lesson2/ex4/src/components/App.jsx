import React, { useState } from 'react'
import Contact from "./Contact"

export default function App() {
  const [contacts, setContacts] = useState([
    {
      name: "Alice",
      number: "(816)-403-5456"
    },
    {
      name: "Bob",
      number: "(816)-403-5457"
    },
    {
      name: "Cris",
      number: "(816)-403-5456"
    },
    {
      name: "Daniel",
      number: "(816)-403-5456"
    },

  ])


  const [inputValues, setInputValues] = useState({
    name: "",
    number: "",
    searchText: ""
  })


  function handleChange(e) {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    })
  }


  function handleAddContact() {
    function compareName(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }
    setContacts([
      ...contacts,
      {
        name: inputValues.name,
        number: inputValues.number
      }
    ].sort(compareName))
    setInputValues({
      ...inputValues,
      name: "",
      number: "",
    })
  }


  function searchedContacts() {
    let result = [];
    contacts.forEach(contact => {
      if (contact.name.includes(inputValues.searchText) || contact.number.includes(inputValues.searchText)) {
        result.push(contact)
      }
    })
    return result;
  }


  function deleteDuplicatedNumbers() {
    let map = {};
    let newContacts = [];
    contacts.forEach(contact => {
      if (!map[contact.number]) {
        map[contact.number] = 1;
        newContacts.push(contact);
      }
    })
    setContacts(newContacts)
  }


  return (
    <div className="mx-auto mt-8 w-[768px] max-w-9/10">
      <div className='flex justify-center items-center w-full'>
        <input
          onChange={handleChange}
          name="name"
          value={inputValues.name}
          type="text"
          placeholder='Tên' />
        <input
          onChange={handleChange}
          name="number"
          value={inputValues.number}
          type="text"
          placeholder='Điện thoại' />
        <button onClick={handleAddContact}>THÊM</button>
      </div>
      <div className="h-[1px] w-full bg-black my-4"></div>
      <div className="flex justify-center items-center mb-8">
        <input
          onChange={handleChange}
          name="searchText"
          value={inputValues.searchText}
          type="text"
          placeholder="Tìm kiếm" />
        <button className="mr-2">TÌM KIẾM</button>
        <button onClick={deleteDuplicatedNumbers}>XÓA TRÙNG</button>
      </div>
      <div>
        {searchedContacts().map((contact, index) => {
          return <Contact key={index} contact={contact} />
        })}
      </div>
    </div>
  )
}
