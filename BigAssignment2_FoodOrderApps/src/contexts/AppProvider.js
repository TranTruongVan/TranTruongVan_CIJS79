import React, { useEffect, useState } from "react"
import { URL_BASE } from "./constant";
import axios from "axios"


export const AppContext = React.createContext()


export default function AppProvider({ children }) {
  const [cart, setCart] = useState();
  const [meals, setMeals] = useState();


  const [orderFormInputs, setOrderFormInputs] = useState({
    yourName: "",
    street: "",
    postalCode: "",
    city: ""
  })


  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
  }, [])


  useEffect(() => {
    async function getMeals() {
      await axios
        .get(`${URL_BASE}/meals`)
        .then(res => {
          setMeals(res.data);
        })
    }
    getMeals();
  }, [])


  function changeCountMeal(mealId, count) {
    setCart((prev) => {
      let updatedCart;
      let gap;
      let mealAmount;
      meals.forEach((meal) => {
        if (meal.id === mealId) {
          mealAmount = meal.price;

        }
      })
      if (prev && JSON.stringify(prev) !== "{}") {
        if (prev.countMeals[mealId]) {
          gap = count - prev.countMeals[mealId];
        } else {
          gap = count;
        }
        updatedCart = {
          countMeals: {
            ...prev.countMeals,
            [mealId]: count
          },
          totalMeals: prev.totalMeals + gap,
          totalAmount: prev.totalAmount + gap * mealAmount
        }
      }
      else { //first cart
        gap = count;
        updatedCart = {
          countMeals: {
            [mealId]: count
          },
          totalMeals: gap,
          totalAmount: gap * mealAmount
        }
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    })
  }


  async function sendOrder() {
    const { yourName, street, postalCode, city } = orderFormInputs;
    await axios.post(`${URL_BASE}/orders`, {
      name: yourName,
      street,
      postalCode,
      city,
      cart
    });
  }


  return (
    <AppContext.Provider value={{
      cart,
      setCart,
      meals,
      changeCountMeal,
      orderFormInputs,
      setOrderFormInputs,
      sendOrder
    }}>
      {children}
    </AppContext.Provider>
  )
}

