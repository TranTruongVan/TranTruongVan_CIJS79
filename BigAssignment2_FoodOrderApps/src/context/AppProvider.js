import React, { useEffect, useState } from "react"


export const AppContext = React.createContext()


export default function AppProvider({ children }) {
  const [cart, setCart] = useState();
  const [meals, setMeals] = useState([
    {
      "id": "m1",
      "name": "Sushi",
      "description": "Finest fish and veggies",
      "price": 22.99,
      "image": "https://i-dulich.vnecdn.net/2021/09/02/5-1630568765-1630568775-4403-1630568961_680x0.jpg"
    },
    {
      "id": "m2",
      "name": "Schnitzel",
      "description": "A german specialty!",
      "price": 16.5,
      "image": "https://www.thespruceeats.com/thmb/cckc3_4QUQ79kSFhcLPM8xg9F3g=/3797x2848/smart/filters:no_upscale()/wiener-schnitzel-recipe-1447089-Hero-5b587d6c46e0fb0071b0059d.jpg"
    },
    {
      "id": "m3",
      "name": "Barbecue Burger",
      "description": "American, raw, meaty",
      "price": 12.99,
      "image": "https://thumbor.thedailymeal.com/GriUVg3OeHEEayqqsBTRBg_x6ZE=/870x565/filters:focal(335x200:336x201)/https://www.thedailymeal.com/sites/default/files/2015/05/27/BBQ-burger-shutterstock-recipe%20crop.jpg"
    },
    {
      "id": "m4",
      "name": "Green Bowl",
      "description": "Healthy...and green...",
      "price": 18.99,
      "image": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2015/7/21/1/HE_Green-Smoothie-Bowl.jpg.rend.hgtvcom.616.462.suffix/1437508213013.jpeg"
    },])
  const [orderFormInputs, setOrderFormInputs] = useState({
    yourName: "",
    street: "",
    postalCode: "",
    city: ""
  })


  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")));
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


  return (
    <AppContext.Provider value={{
      cart,
      setCart,
      meals,
      changeCountMeal,
      orderFormInputs,
      setOrderFormInputs
    }}>
      {children}
    </AppContext.Provider>
  )
}

