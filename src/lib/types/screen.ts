import { Member } from "./member";
import { Product } from "./product";

// ** REACT APP STATE **// //Butin appimizni stateini shu faylda hosil qildik .
export interface AppRootState {
  homePage: HomePageState; //Home pagega bogliq bolgan state interfaceini shaqirip oldik CALL
  //   productsPage: ProductsPageState;
  //   ordersPage: OrdersPageState;
  //   userPage: UserPageState;
  //   helpPage: HelpPageState;
}
//DEFINE
// ** HOME PAGE **//
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}
// ** PRODUCTS PAGE **//
// ** ORDERS PAGE **//
// ** USER PAGE **//
// ** HELP PAGE **//
