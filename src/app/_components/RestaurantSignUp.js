"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const RestaurantSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_password] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState(false);

  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== c_password) {
      setPasswordError(true);
      return false;
    } else {
      setPasswordError(false);
    }

    if (
      !email ||
      !name ||
      !city ||
      !address ||
      !password ||
      !c_password ||
      !contact
    ) {
      setError(true);
      return false;
    } else {
      setError(false);
    }

    console.log(email, password, c_password, name, address, contact, city);
    let response = await fetch("http://localhost:3001/api/restaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name, city, address, contact }),
    });

    response = await response.json();
    console.log(response);

    if (response.success) {
      console.log(response);
      const { result } = response;

      delete result.password;

      localStorage.setItem("restaurantUser", JSON.stringify(result));
      router.push("/restaurant/dashboard");
    }
  };

  return (
    <>
      <h1> Sign Up</h1>
      <div>
        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Enter Email Id"
            className="input-field"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {error && !email && (
            <span className="input-error">Please Enter valid Email</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Enter Password"
            className="input-field"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && (
            <span className="input-error">
              Password and Confirm Password not match
            </span>
          )}
          {error && !password && (
            <span className="input-error">Please Enter valid Password</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={c_password}
            onChange={(event) => setC_password(event.target.value)}
          />
          {error && !c_password && (
            <span className="input-error">
              Please Enter valid Confirm Password
            </span>
          )}

          {passwordError && (
            <span className="input-error">
              Password and Confirm Password not match
            </span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Restaurant Name"
            className="input-field"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {error && !name && (
            <span className="input-error">Please Enter valid Name</span>
          )}
        </div>

        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter City"
            className="input-field"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          />
          {error && !city && (
            <span className="input-error">Please Enter valid City</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Full Address"
            className="input-field"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          {error && !address && (
            <span className="input-error">Please Enter valid Address</span>
          )}
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Enter Contact No."
            className="input-field"
            value={contact}
            onChange={(event) => setContact(event.target.value)}
          />
          {error && !contact && (
            <span className="input-error">Please Enter valid Contact</span>
          )}
        </div>
        <div className="input-wrapper">
          <button className="button" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
};

export default RestaurantSignUp;
