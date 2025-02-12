"use client";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

const EditFoodItems = ({ params }) => {
  const paramsData = use(params); 
  const id = paramsData?.id;

  console.log("This is props ", id);
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState(false);

  useEffect(() => {
    handleLoadFoodItem();
  }, [id]);

  const handleLoadFoodItem = async () => {
    let response = await fetch(
      "http://localhost:3001/api/restaurant/foods/edit/" + id
    );
    const data = await response.json();
    console.log("Find Data ", data);
    if (data.success) {
      console.log(data.result);
      setName(data.result.name);
      setPrice(data.result.price);
      setImage(data.result.image);
      setDescription(data.result.description);
    } else {
      alert("Data is not getting!");
    }
  };

  const handleEditFoodItems = async () => {
    console.log(name, price, image, description);

    if (!name || !price || !image || !description) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    let response = await fetch(
      "http://localhost:3001/api/restaurant/foods/edit/" + id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image, description }),
      }
    );

    response = await response.json();

    if (response.success) {
      router.push("../dashboard");
   
    } else {
      alert("Data is not updated please try again!");
    }

    console.log(name, price, image, description);
  };

  return (
    <>
      <div className="container">
        <h1>Update Food Items</h1>
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
            <span className="input-error">Please enter valid Description </span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleEditFoodItems}>
            Update Food Items
          </button>
        </div>
        <div className="input-wrapper">
          <button
            className="button"
            onClick={() => {
              router.push("../dashboard");
            }}
          >
            Back to Food Item List
          </button>
        </div>
      </div>
    </>
  );
};

export default EditFoodItems;
