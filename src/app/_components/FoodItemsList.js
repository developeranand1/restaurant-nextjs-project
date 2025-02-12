import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FoodItemsList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const router=useRouter()

  useEffect(() => {
    loadFoodItems();
  }, []);

  const loadFoodItems = async () => {
    const responseData = JSON.parse(localStorage.getItem("restaurantUser"));
    const resto_id = responseData._id;
    let response = await fetch(
      "http://localhost:3001/api/restaurant/foods/" + resto_id
    );
    response = await response.json();

    if (response.success) {
      console.log(response.result);
      setFoodItems(response.result);
    } else {
      alert("Food item list not loading!");
    }
  };

  const deleteItems=async(id)=>{
    let response=await fetch('http://localhost:3001/api/restaurant/foods/'+id,{
      method:'delete'
    });
    response =await response.json();

    if(response.success){
     loadFoodItems();
    }
    else{
      alert("Food Item is not deleted!")
    }
  }

  return (
    <>
      <h1>Food Item List</h1>
      {
        foodItems.length > 0? <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Image</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.map((item, key) => (
            <tr key={item._id}>
              <td>{key + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>

              <td>{item.description}</td>
              <td>
                <img src={item.image} />
              </td>
              <td>
                <button onClick={()=>{router.push('dashboard/'+item._id)}}>Edit</button> 
                <button onClick={()=>{deleteItems(item._id)}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>:
      <h2>No Food added here!</h2>
      }
     
    </>
  );
};

export default FoodItemsList;
