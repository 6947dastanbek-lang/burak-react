import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload; //Yani action.payload ni initialStateda joylashgan popularDishes keyining valuesiga tenglashtir degani
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});
export const { setPopularDishes, setNewDishes, setTopUsers } =
  homePageSlice.actions; //bu reducerlarni(actions) boshqa fayllarda ISHLATISH uchun export qildik.
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer; //hompage slicega daqildor bolgan  reducerni yaqlit holda store.ts faylida import qilip BOGLASH uchun export qildik.
