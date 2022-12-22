import React, { useContext, useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AppContext } from '../contexts/AppProvider';

export default function ExpenseContainer() {
  const [year, setYear] = useState(`${new Date().getFullYear()}`);
  const { expense } = useContext(AppContext);
  console.log(expense)

  return (
    <div className="bg-black rounded-md p-8 mt-14 w-[500px] md:w-[800px] max-w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="text-white">Filter by Year</div>
        <SelectYears stateYear={[year, setYear]} />
      </div>
      <ChartContainer />
      <ExpenseItem />
    </div>
  )
}


function SelectYears(props) {
  const [year, setYear] = props.stateYear;

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
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2022}>2022</MenuItem>
          <MenuItem value={2023}>2023</MenuItem>
          <MenuItem value={2024}>2024</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}


function ChartContainer() {
  const items = [
    {
      month: "Jan",
      value: "60"
    },
    {
      month: "Feb",
      value: "60"
    },
    {
      month: "Mar",
      value: "60"
    },
    {
      month: "Apr",
      value: "60"
    },
    {
      month: "May",
      value: "60"
    },
    {
      month: "Jun",
      value: "60"
    },
    {
      month: "Jul",
      value: "60"
    },
    {
      month: "Aug",
      value: "60"
    },
    {
      month: "Sep",
      value: "60"
    },
    {
      month: "Oct",
      value: "60"
    },
    {
      month: "Nov",
      value: "30"
    },
    {
      month: "Dec",
      value: "60"
    },
  ]
  return (
    <div className="bg-[#E1CAE4] rounded-md p-1 md:p-5 flex justify-around items-center">
      {items.map(item => {
        return <ChartItem key={item} item={item} />
      })}
    </div>
  )
}


function ChartItem(props) {
  const { month, value } = props.item;
  return (
    <div className="flex flex-col items-center">
      <div className="relative md:w-5 md:h-32 h-16 w-2 border border-black rounded-lg bg-purple-primary">
        <div className={`absolute w-full bg-purple-secondary h-[${30}%] rounded-b-lg z-10 bottom-0`}></div>
      </div>
      <div className="text-[8px] md:text-base">{month}</div>
    </div>)
}


function ExpenseItem() {

}