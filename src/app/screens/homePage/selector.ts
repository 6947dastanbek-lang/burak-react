import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homePage; //redux store dagi homePage state ni select qilip oldik.
// AppRootState interfaceini select qilip oldik. Bu interface butun appimizni stateini o'z ichiga oladi.

export const retrievePopularDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.popularDishes, //homePage state dagi popularDishes ni select qilip oldik.
);

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newDishes,
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topUsers,
);
