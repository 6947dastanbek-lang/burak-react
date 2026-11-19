import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";
//**REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), //setPopularDishes kamandasini dispatch qilip, backenddan kelgan data ni redux store ga joylashtirish uchun ishlatdik.
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)), //setNewDishes kamandasini dispatch qilip, backenddan kelgan data ni redux store ga joylashtirish uchun ishlatdik.
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)), //setTopUsers kamandasini dispatch qilip, backenddan kelgan data ni redux store ga joylashtirish uchun ishlatdik.
});

export default function HomePage() {
  // selector => component selectordan qaytarilgan popularDishes ni destructure qildik

  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server data fetch => Data
    const product = new ProductService(); //ProductService classidan yangi instance object yaratdik. Bu bizga backend server bilan ishlash imkonini beradi.

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => setPopularDishes(data))
      .catch((err) => console.log(err));
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => setNewDishes(data))
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data)) //setTopUsers kamandasini dispatch qilip, backenddan kelgan data ni redux store ga joylashtirish uchun ishlatdik.
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
