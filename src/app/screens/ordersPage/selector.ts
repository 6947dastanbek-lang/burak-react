// [KETMA-KETLIK-COMMENT: 5.2-BOSQICH (DEFINE)] ordersPage selectorlari (retrievePausedOrders, retrieveProcessOrders, retrieveFinishedOrders)
import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pausedOrders,
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders,
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders,
);
