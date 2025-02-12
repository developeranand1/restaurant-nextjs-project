"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PageBanner = () => {
  const [location, setLocation] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [showLocation, setShowLocation] = useState(false);

  const router = useRouter();

  useEffect(() => {
    loadLocation();
    loadRestaurants();
  }, []);

  const loadLocation = async () => {
    let response = await fetch("http://localhost:3001/api/customer/locations");
    response = await response.json();

    if (response.success) {
      setLocation(response.result);
    }
  };

  const loadRestaurants = async (params) => {
    let url = "http://localhost:3001/api/customer";

    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }

    let response = await fetch(url);

    response = await response.json();

    if (response.success) {
      setRestaurants(response.result);
    } else {
      alert("Restaurant is not fetch!");
    }
  };

  const handleListItem = (item) => {
    setSelectedLocation(item);
    setShowLocation(false);
    loadRestaurants({ location: item });
  };

  return (
    <>
      <div className="main-page-banner">
        <h1>Food Delivery App</h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={selectedLocation}
            className="select-input"
            placeholder="Select Place"
            onClick={() => {
              setShowLocation(true);
            }}
          />

          <ul className="location-list">
            {showLocation &&
              location.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    handleListItem(item);
                  }}
                >
                  {item}
                </li>
              ))}
          </ul>
          <input
            type="text"
            className="search-input"
            placeholder="Enter Food or restaurant name"
            onChange={(e) => {
              loadRestaurants({ restaurant: e.target.value });
            }}
          />
        </div>
      </div>
      <div className="restaurant-list-container">
        {restaurants.map((item, index) => (
          <div
            key={index}
            className="restaurant-wrapper"
            onClick={() => {
              router.push("explore/" + item.name + "?id=" + item._id);
            }}
          >
            <div className="heading-wrapper">
              <h3>{item.name} </h3>
              <h5>Contact: {item.contact} </h5>
            </div>

            <div className="address-wrapper">
              <div>{item.city}</div>
              <div className="address">
                {item.address}, Email: {item.email}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PageBanner;
