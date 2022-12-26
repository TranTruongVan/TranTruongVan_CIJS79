import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppProvider';

export default function CartModal(props) {
  const { meals, cart, setCart } = useContext(AppContext);
  const [mealsInCart, setMealsInCart] = useState();
  const [totalAmount, setTotalAmount] = useState();
  const [isDisplayOrderForm, setIsDisplayOrderForm] = useState(false);
  const [orderFormInputs, setOrderFormInputs] = useState({
    yourName: "",
    street: "",
    postalCode: "",
    city: ""
  })
  const [error, setError] = useState({
    yourName: false,
    street: false,
    postalCode: false,
    city: false
  })
  const [sendingOrderStatus, setSendingOrderStatus] = useState("not yet");


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


  function handleConfirm() {
    let flag = false;
    let error = {
      yourName: false,
      street: false,
      postalCode: false,
      city: false
    }
    if (orderFormInputs.yourName === "") {
      flag = true;
      error.yourName = true;
    }
    if (orderFormInputs.street === "") {
      flag = true;
      error.street = true;
    }
    if (orderFormInputs.postalCode === "") {
      flag = true;
      error.postalCode = true;
    }
    if (orderFormInputs.city === "") {
      flag = true;
      error.city = true;
    }
    setError(error);

    if (flag) return;
    sendOrder();
  }


  async function sendOrder() {
    setSendingOrderStatus("pending");
    setTimeout(() => {
      setSendingOrderStatus("successfully");
      localStorage.removeItem("cart");
      setCart({});
    }, 3000);
  }


  return (
    <div className="w-[500px] max-h-[550px] p-4 rounded-xl bg-white text-black mt-32 mx-auto overflow-auto">
      {sendingOrderStatus === "pending" &&
        <div className="text-xl font-bold text-black">Sending or data...</div>
      }
      {sendingOrderStatus === "successfully" &&
        <div>
          <div className="text-xl font-bold text-black">Successfully send the order!</div>
          <div
            className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-white bg-brown-primary ml-4 hover:opacity-70 float-right mt-4"
            onClick={() => { props.setIsDisplayCartModal(false) }}>
            Close
          </div>
        </div>

      }
      <div style={{
        display: sendingOrderStatus === "not yet" ? "block" : "none"
      }}>
        {mealsInCart?.map(meal => {
          return <MealItem key={meal.id} data={meal} />
        })}
        <div className="flex justify-between items-center my-4">
          <div className="font-bold text-xl">Total Amount</div >
          <div className="font-bold text-xl">${totalAmount ? totalAmount.toFixed(2) : 0}</div >
        </div>
        {!isDisplayOrderForm &&
          <div className="flex justify-end my-4">
            <div
              className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary"
              onClick={() => { props.setIsDisplayCartModal(false) }}>
              Close
            </div>
            {(totalAmount && (totalAmount.toFixed(2) !== 0)) &&
              <div
                className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-white bg-brown-primary ml-4 hover:opacity-70"
                onClick={() => { setIsDisplayOrderForm(true) }}>
                Order
              </div>
            }
          </div>
        }
        {isDisplayOrderForm &&
          <div>
            <Input
              isError={error.yourName}
              name="Your Name"
              value={orderFormInputs.yourName}
              setOrderFormInputs={setOrderFormInputs} />
            <Input
              isError={error.street}
              name="Street"
              value={orderFormInputs.street}
              setOrderFormInputs={setOrderFormInputs} />
            <Input
              isError={error.postalCode}
              name="Postal Code"
              value={orderFormInputs.postalCode}
              setOrderFormInputs={setOrderFormInputs} />
            <Input
              isError={error.city}
              name="City"
              value={orderFormInputs.city}
              setOrderFormInputs={setOrderFormInputs} />
          </div>
        }
        {isDisplayOrderForm &&
          <div className="flex justify-end my-4 mt-8">
            <div
              className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary"
              onClick={() => { setIsDisplayOrderForm(false) }}>
              Cancel
            </div>
            <div
              className="py-1 px-6 rounded-2xl cursor-pointer border-2 border-brown-primary text-white bg-brown-primary ml-4 hover:opacity-70"
              onClick={handleConfirm}>
              Confirm
            </div>
          </div>
        }
      </div >
    </div>
  )
}


function MealItem(props) {
  const { changeCountMeal } = useContext(AppContext)
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
          className="flex justify-center px-4 rounded-md cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary"
          onClick={() => changeCountMeal(id, count - 1)}>
          -
        </div>
        <div
          className="flex justify-center px-4 rounded-md cursor-pointer border-2 border-brown-primary text-brown-primary hover:text-white hover:bg-brown-primary ml-4"
          onClick={() => changeCountMeal(id, count + 1)}>
          +
        </div>
      </div>
    </div>
  )
}


function Input(props) {
  const { name, value, isError } = props;
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    if (isError)
      setErrorMessage(`Please enter a valid ${name.toLowerCase()}`)
  }, [isError])


  function handleChange(e) {
    setErrorMessage("");
    const value = e.target.value;
    const nameToKey = {
      "Your Name": "yourName",
      "Street": "street",
      "Postal Code": "postalCode",
      "City": "city"
    }
    props.setOrderFormInputs(prev => {
      return {
        ...prev,
        [nameToKey[name]]: value
      }
    })
  }


  return (
    <label className="text-black mb-3 block">
      <div
        style={{
          color: errorMessage === "" ? "black" : "red"
        }}
        className="font-bold">
        {name}
      </ div>
      <input
        style={{
          borderColor: errorMessage === "" ? "black" : "red"
        }}
        className="mt-1 block border py-[1px] border-black px-2 rounded w-72 max-w-[90%]"
        type="text"
        value={value}
        onChange={handleChange} />
      {errorMessage !== "" &&
        <div className="text-red-500">
          {errorMessage}
        </div>
      }
    </label>

  )
}
