import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

// ** REACT APP STATE **// //Butin appimizni stateini shu faylda hosil qildik .
export interface AppRootState {
  homePage: HomePageState; //Home pagega bogliq bolgan state interfaceini shaqirip oldik CALL
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
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
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

// ** ORDERS PAGE **//
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
// ** USER PAGE **//
// ** HELP PAGE **//
