"use client";

import { useState } from "react";

import RestaurantHeader from "../_components/RestaurantHeader";

import './style.css'
import RestaurantFooter from "../_components/RestaurantFooter";
import RestaurantLogin from "../_components/RestaurantLogin";
import RestaurantSignUp from "../_components/RestaurantSignUp";

const Restaurant = () => {
  const [login, setLogin] = useState(true);

  return (
    <>
    <div className="container">
      <RestaurantHeader/>
      <h1>Restaurant Login / Sign Up Page </h1>
      {login ? <RestaurantLogin /> : <RestaurantSignUp />}

      <div>
        <button className="button-link" onClick={() => setLogin(!login)}>
          {login
            ? "Do not have account? SignUp"
            : "Already have Account ? Login"}
        </button>
      </div>
      </div>
      <RestaurantFooter/>
    </>
  );
};

export default Restaurant;
