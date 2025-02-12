import { useState } from "react";

const AddFoodItems = ({setAddItems}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(false);

  const handleAddFoodItems = async () => {
    console.log(name, price, image, description);

    if (!name || !price || !image || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let resto_id;

    const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"));
    if (restaurantData) {
      resto_id = restaurantData?._id;
      console.log(resto_id);
    }

    let response = await fetch("http://localhost:3001/api/restaurant/foods", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        price,
        image,
        description,
        resto_id,
      }),
    });

    response = await response.json();
    console.log(response);

    if (response.success) {
      alert("Food Items Added Successfully!");
      setAddItems(false)
    } else {
      alert("Food not added!");
    }
  };

  return (
    <>
      <div className="container">
        <h1>Add Food Items</h1>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          {error && !name && (
            <span className="input-error"> Please enter valid name </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food Price"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          {error && !price && (
            <span className="input-error"> Please enter valid Price </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            className="input-field"
            placeholder="Enter food Image Path"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          {error && !image && (
            <span className="input-error"> Please enter valid Image Path </span>
          )}
        </div>
        <div className="input-wrapper">
          <textarea
            type="text"
            className="input-field"
            placeholder="Enter food Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          {error && !description && (
            <span className="input-error">
           
              Please enter valid Description{" "}
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleAddFoodItems}>
            Add Food Items
          </button>
        </div>
      </div>
    </>
  );
};

export default AddFoodItems;
