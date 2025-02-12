"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RestaurantHeader = () => {
  const [details, setDetails] = useState(null);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setIsClient(true); // Ensures the component is mounted on client

    const data = localStorage.getItem("restaurantUser");

    if (!data && pathName === "/restaurant/dashboard") {
      router.push("/restaurant");
    } else if (data && pathName === "/restaurant") {
      router.push("/restaurant/dashboard");
    } else if (data) {
      setDetails(JSON.parse(data));
    }
  }, [pathName, router]);

  const logout = () => {
    localStorage.removeItem("restaurantUser");
    setDetails(null);
    router.push("/restaurant");
  };

  return (
    <div className="header-wrapper">
      <div className="logo">
        <img
          style={{ width: 100 }}
          src="https://png.pngtree.com/template/20200610/ourmid/pngtree-food-delivery-logo-design-image_381319.jpg"
          alt="Restaurant Logo"
        />
      </div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>

        {isClient && details?.name ? (
          <>
            <li>
              <button onClick={logout}>Logout</button>
            </li>
            <li>
              <Link href="/">Profile</Link>
            </li>
          </>
        ) : (
          <li>
            <Link href="/">Login/SignUp</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default RestaurantHeader;
