"use client";

import CustomerHeader from "@/app/_components/CustomerHeader";
import RestaurantFooter from "@/app/_components/RestaurantFooter";
import { useEffect, useState } from "react";

const Page = (props) => {
  const name = props.params.name;

  const [restaurantDetails, setRestaurantsDetails] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [cartData, setCartData] = useState();
  const [cartStorage, setCartStorage] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );
  const [cartIds, setCardIds] = useState(() =>
    cartStorage
      ? cartStorage.map((item) => {
          return item._id;
        })
      : []
  );

  console.log(cartIds);

  useEffect(() => {
    loadRestaurantDetails();
  }, []);

  const loadRestaurantDetails = async () => {
    const id = props.searchParams.id;

    console.log(id);
    if (id) {
      let response = await fetch("http://localhost:3001/api/customer/" + id);
      response = await response.json();

      if (response.success) {
        setRestaurantsDetails(response.details);
        setFoodItems(response.foodItems);
      }
    }
  };

  const addToCart = (item) => {
    setCartData(item);
    // setCardIds((prevCartIds) => [...prevCartIds, item._id]);
    let localCartIds=cartIds;
    localCartIds.push(item._id);
    setCardIds(localCartIds);
  };

  const removeFromCart = (item) => {
    setCardIds((prevCartIds) => prevCartIds.filter((id) => id !== item._id)); // Removing item
  };

  return (
    <div>
      <CustomerHeader cartData={cartData} />
      <div className="restaurant-page-banner">
        <h1>{decodeURI(name)}</h1>
      </div>
      <div className="detail-wrapper">
        <h3>Contact : {restaurantDetails?.contact}</h3>
        <h3>City : {restaurantDetails?.city}</h3>
        <h3>Address : {restaurantDetails?.address}</h3>
        <h3>Email : {restaurantDetails?.email}</h3>
      </div>

      <div className="food-item-wrapper">
        {foodItems.length > 0 ? (
          foodItems.map((item, index) => (
            <div key={index} className="list-item">
              <div>
                {" "}
                <img style={{ width: 100 }} src={item.image} alt={item.name} />
              </div>
              <div>
                <div>{item.name}</div>
                <div>{item.price}</div>
                <div className="description">{item.description}</div>
                {cartIds.includes(item._id) ? (
                 
                  <button  onClick={() => removeFromCart(item)} >
                    Remove From Cart
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      addToCart(item);
                    }}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <h1>No Food item added for now</h1>
        )}
      </div>
      <RestaurantFooter />
    </div>
  );
};

export default Page;
