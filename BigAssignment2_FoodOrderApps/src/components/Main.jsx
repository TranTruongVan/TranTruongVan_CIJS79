import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider'

export default function Main() {
  return (
    <div className="mt-[72px] w-full h-96 bg-white relative">
      <img
        className="w-full h-96 bg-cover bg-repeat object-cover bg-bottom"
        src="https://www.masalabox.com/wp-content/uploads/2022/03/north-indian-cuisine.jpg"
        alt="" />
      <Banner />
      <MealsContainer />
      <div className="mt-12 h-1 w-1"></div>
    </div>
  )
}


function Banner() {
  return (
    <div className="absolute top-64 p-6 left-1/2 max-w-3xl -translate-x-1/2 z-10 shadow-2xl rounded-xl bg-black-primary text-white flex flex-col items-center text-center">
      <div className="font-bold text-3xl mb-8">Delicious Food, Delivered To You</div>
      <div className="mb-4 text-xl">Choose your favorite meal from our broad selection of available meals and enjoy a delicious lunch or dinner at home.</div>
      <div className="text-xl" >All our meals are cooked with hight quality ingredients, just in time and of course by experience chefs!</div>
    </div>
  )
}


function MealsContainer() {
  const { meals } = useContext(AppContext);
  return (
    <div className="mt-40 text-center max-w-5xl bg-white rounded-xl mx-auto py-3 px-6">
      {meals.map(meal => {
        return <MealItem key={meal.id} data={meal} />
      })}
    </div>
  )
}


function MealItem(props) {
  const { id, name, description, price, image } = props.data
  const { cart, changeCountMeal } = useContext(AppContext);
  const [count, setCount] = useState("");


  useEffect(() => {
    if (cart && JSON.stringify(cart) !== "{}") {
      if (cart.countMeals[id]) {
        setCount(cart.countMeals[id])
      }
    }
    else {
      setCount(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])


  function handleChange(e) {
    //check only number
    if (e.target.value === "") {
      changeCountMeal(id, 0);
      setCount(0);
      return;
    }
    if (Number.isNaN(Number(e.target.value))) {
      return;
    }
    changeCountMeal(id, Number(e.target.value));
  }


  function handleAdd() {
    changeCountMeal(id, count === "" ? 1 : Number(count) + 1);
  }


  return (
    <div className="py-3 flex border-b border-b-black">
      <img className="w-40 h-28" src={image} alt="" />
      <div className="flex-1 flex flex-col items-start font-bold p-2">
        <div className="text-2xl">{name}</div>
        <div className="italic text-gray-400 text-lg">{description}</div>
        <div className="text-[#96490c] text-xl">${price}</div>
      </div>
      <div className="p-2">
        <div className="flex items-center">
          <div className="mr-2 font-bold">Amount:</div>
          <input
            className="w-12 rounded-md border border-black text-center px-1"
            type="text"
            onChange={handleChange}
            placeholder="0"
            value={count}
          />
        </div>
        <div className="bg-brown-primary inline-block float-right text-white mt-2 py-1 px-6 rounded-2xl font-bold hover:opacity-50 cursor-pointer" onClick={handleAdd}>+Add</div>
      </div>
    </div>
  )
}
