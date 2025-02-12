"use client";
import RestaurantHeader from "@/app/_components/RestaurantHeader";
import "./../style.css";
import AddFoodItems from "@/app/_components/AddFoodItems";
import { useState } from "react";
import FoodItemsList from "@/app/_components/FoodItemsList";

const Dashboard = () => {
  const [addItems, setAddItems] = useState(false);
  return (
    <>
      <RestaurantHeader />
      <button onClick={()=>{setAddItems(true)}}>Add Food</button>
      <button onClick={()=>{setAddItems(false)}}>Dashboard</button>
      {addItems ? <AddFoodItems setAddItems={setAddItems} /> : <FoodItemsList/>}
    </>
  );
};

export default Dashboard;
