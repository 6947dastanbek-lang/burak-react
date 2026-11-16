import React from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";
import { useEffect } from "react";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setPopularDishes } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";

//**REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)), //setPopularDishes kamandasini dispatch qilip, backenddan kelgan data ni redux store ga joylashtirish uchun ishlatdik.
});

export default function HomePage() {
  // selector => component
  //selectordan qaytarilgan popularDishes ni destructure qildik
  const { setPopularDishes } = actionDispatch(useDispatch());
  useEffect(() => {
    // Backend server data fetch => Data
    const product = new ProductService();

    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        console.log("data passed here:", data);
        setPopularDishes(data);
      })
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
