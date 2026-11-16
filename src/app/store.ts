import { red } from "@mui/material/colors";
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import HomePageReducer from "./screens/homePage/slice";
import ReduxLogger from "redux-logger";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    //@ts-ignore
    getDefaultMiddleware().concat(ReduxLogger), //logger middleware ni redux store ga boglash uchun ishlatdik. Bu bizga console da state ni kuzatish imkonini beradi.

  reducer: { homePage: HomePageReducer }, //homePageSlice reducerini yaqlit holda bizni Redux storga boglandi.
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
