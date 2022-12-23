import React, { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppContext } from '../contexts/AppProvider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ExpenseContainer(props) {
  const { year, expenses } = useContext(AppContext);


  function expensesFilterByYear() {
    return expenses.filter(expense => expense.date.split("-")[0] === year);
  }


  return (
    <div className="bg-black rounded-md md:p-8 p-3 mt-14 w-[500px] md:w-[800px] max-w-[90%] mx-auto mb-8">
      <FilterContainer />
      <ChartContainer />
      {expensesFilterByYear().map((expense) => {
        return <ExpenseItem setIsEditing={props.setIsEditing} key={expense.id} data={expense} />
      })}
    </div>
  )
}


function FilterContainer() {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="text-white">Filter by Year</div>
      <SelectYears />
    </div>
  )
}


function SelectYears() {
  const { year, setYear } = useContext(AppContext);
  const handleChange = (event) => {
    setYear(event.target.value);
  };


  return (
    <div>
      <FormControl sx={{
        m: 1,
        minWidth: 120,
        backgroundColor: "white",
        borderRadius: "0.375rem"
      }}>
        <Select
          value={year}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value={"2021"}>2021</MenuItem>
          <MenuItem value={"2022"}>2022</MenuItem>
          <MenuItem value={"2023"}>2023</MenuItem>
          <MenuItem value={"2024"}>2024</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}


function ChartContainer() {
  const { chartData } = useContext(AppContext);
  return (
    <div className="bg-[#E1CAE4] rounded-md p-1 md:p-5 flex justify-around items-center">
      {chartData.map((item, index) => {
        return <ChartItem key={index} item={item} />
      })}
    </div>
  )
}


function ChartItem(props) {
  const { month, percentage, amount } = props.item;
  const [isShowAmount, setIsShowAmount] = useState(false)

  return (
    <div className="relative flex flex-col items-center">
      {
        isShowAmount &&
        <div className="absolute -top-10 py-2 px-4 bg-black rounded-md z-20 text-white text-xs border border-white">
          {`$${amount}`}
        </div>
      }
      <div
        className="relative md:w-5 md:h-32 h-16 w-2 border border-black rounded-lg bg-[#BAA5ED] overflow-hidden hover:opacity-50 cursor-pointer"
        onMouseEnter={() => setIsShowAmount(true)}
        onMouseLeave={() => setIsShowAmount(false)}>
        <div
          style={{
            height: `${percentage}%`
          }}
          className="absolute w-full bg-[#3D15A9] rounded-b-lg z-10 bottom-0">
        </div>
      </div>
      <div className="text-[8px] md:text-base">{month}</div>
    </div>)
}


function ExpenseItem(props) {
  const { setExpenses, setInputValues, setExpenseEditingId } = useContext(AppContext)
  const { id, date, name, amount } = props.data;
  const { month, year, day } = getDataDate(date);


  function getDataDate(date) {
    const [year, month, day] = date.split("-");
    const months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    return {
      year,
      day,
      month: months[month - 1]
    }
  }


  function handleEditExpense() {
    props.setIsEditing(true);
    setInputValues(() => {
      return {
        name,
        amount: amount.split(" ")[1],
        date
      }
    })
    setExpenseEditingId(id);
  }


  function handleDeleteExpense() {
    setExpenses((prev) => {
      return prev.filter(expense => expense.id !== id);
    })
  }


  return (
    <div className="bg-[#575757] p-3 my-6 flex justify-center items-center rounded-md">
      <div className="md:w-28 md:h-28 w-16 h-16 rounded-md border border-white bg-black flex flex-col items-center justify-center text-white">
        <div className="text-[8px] md:text-base">{month}</div>
        <div className="text-[8px] md:text-base font-bold">{year}</div>
        <div className="font-bold text-base md:text-3xl">{day}</div>
      </div>
      <div className="flex-1 md:text-4xl text-xs text-white px-4 font-bold overflow-hidden">{name}</div>
      <div className="flex flex-col justify-center items-end">
        <div className="btn-purple md:py-2 md:px-4 md:text-2xl font-bold text-base py-1 px-2">
          {amount}
        </div>
        <div className="flex items-center justify-end md:mt-4 mt-1 md:scale-100 scale-75">
          <div
            className="cursor-pointer btn-purple mr-2"
            onClick={handleEditExpense}>
            <EditIcon />
          </div>
          <div
            className="cursor-pointer btn-purple"
            onClick={handleDeleteExpense}>
            <DeleteIcon />
          </div>
        </div>
      </div>
    </div>
  )
}