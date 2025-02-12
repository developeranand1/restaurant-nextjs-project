import Image from "next/image";
import styles from "./page.module.css";
import CustomerHeader from "./_components/CustomerHeader";
import RestaurantFooter from "./_components/RestaurantFooter";
import PageBanner from "./_components/PageBanner";

export default function Home() {
  return (
   
      <main >
        <CustomerHeader/>
        <PageBanner/>
        <RestaurantFooter/>
      </main>
     
  
  );
}
