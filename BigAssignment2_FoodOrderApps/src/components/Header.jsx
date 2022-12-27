import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppContext } from '../contexts/AppProvider';
import CartModal from './CartModal';

export default function Header() {
  const [isDisplayCartModal, setIsDisplayCartModal] = useState(false);
  const { cart } = useContext(AppContext);
  const [totalMeals, setTotalMeals] = useState(0);

  useEffect(() => {
    if (cart && JSON.stringify(cart) !== "{}") {
      setTotalMeals(cart.totalMeals)
    }
    else {
      setTotalMeals(0);
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


