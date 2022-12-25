import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppContext } from '../context/AppProvider';

export default function Header() {
  const [isDisplayCartModal, setIsDisplayCartModal] = useState(false);
  const { cart } = useContext(AppContext);
  const [totalMeals, setTotalMeals] = useState(0);

  useEffect(() => {
    if (cart) {
      setTotalMeals(cart.totalMeals)
    }
  }, [cart])

  return (
    <div className=" bg-brown-primary text-white fixed w-screen top-0 z-50">
      {isDisplayCartModal &&
        <div className="fixed w-screen h-screen bg-[#00000080]">
          <CartModal setIsDisplayCartModal={setIsDisplayCartModal} />
        </div>
      }
      <div className="flex justify-between items-center max-w-7xl mx-auto my-3">
        <div className="text-3xl font-bold">ReactMeals</div>
        <div
          className="py-2 px-8 rounded-2xl bg-[#441403] flex justify-center items-center hover:opacity-70 cursor-pointer"
          onClick={() => { setIsDisplayCartModal(true) }}>
          <ShoppingCartIcon />
          <div className="mx-3 font-bold">Your Cart</div>
          <div className="py-1 px-4 bg-brown-primary rounded-full">{totalMeals}</div>
        </div>
      </div>
    </div>
  )
}


function CartModal(props) {
  const { meals, cart } = useContext(AppContext);
  const [mealsInCart, setMealsInCart] = useState();
  const [totalAmount, setTotalAmount] = useState()


  useEffect(() => {
    if (cart) {
      setMealsInCart(() => {
        let result = [];
        const countMeals = cart.countMeals;
        if (!countMeals) { return }
        meals.forEach(meal => {
          if (countMeals[meal.id]) {
            result.push({
              id: meal.id,
              name: meal.name,
              price: meal.price,
              count: countMeals[meal.id]
            })
          }
        })
        return result;
      })
      setTotalAmount(cart.totalAmount);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])


  return (
    <div className="w-[500px] p-4 rounded-xl bg-white text-black mt-32 mx-auto">
      {mealsInCart?.map(meal => {
        return <MealItem key={meal.id} data={meal} />
      })}
      <div className="flex justify-between items-center my-4">
        <div className="font-bold text-xl">Total Amount</div >
        <div className="font-bold text-xl">${totalAmount?.toFixed(2)}</div >
      </div>
      <div className="flex justify-end my-4">
        <div
          className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary"
          onClick={() => { props.setIsDisplayCartModal(false) }}>
          Close
        </div>
        <div
          className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-white bg-brown-primary ml-4 hover:opacity-70">
          Order
        </div>
      </div>
    </div>
  )
}


function MealItem(props) {
  const { addMeal } = useContext(AppContext)
  const { id, name, price, count } = props.data;
  return (
    <div className="flex justify-between items-center py-4 border-b-[3px] border-brown-primary">
      <div>
        <div className="font-bold text-xl mb-2">{name}</div>
        <div>
          <div className="inline-block font-bold text-brown-primary w-24">${price}</div>
          <div className="inline-block px-3 bg-gray-200 rounded-sm shadow-lg">x{count}</div>
        </div>
      </div>
      <div className="flex justify-end">
        <div
          className="flex justify-center px-4 rounded-md cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary">
          -
        </div>
        <div
          className="flex justify-center px-4 rounded-md cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary ml-4"
          onClick={() => addMeal(id)}>
          +
        </div>
      </div>
    </div>
  )
}
