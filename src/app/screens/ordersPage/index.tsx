import React, { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { setFinishedOrders, setPausedOrders, setProcessOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import OrderService from "../../services/OrderService";
import { OrderStatus } from "../../../lib/enums/order.enum";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";
import { MemberType } from "../../../lib/enums/member.enum";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
});

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();

  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  // [KETMA-KETLIK-COMMENT: 6.3 & 7.1-BOSQICH (CALL)] useEffect: getMyOrders orqali buyurtmalarni yuklash va orderBuilder o'zgarganda avto-yangilash
  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => setPausedOrders(data))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => setProcessOrders(data))
      .catch((err) => console.log(err));
    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => setFinishedOrders(data))
      .catch((err) => console.log(err));
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS **/
  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  if (!authMember) history.push("/");
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
            <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={
                      authMember?.memberType === MemberType.RESTAURANT
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <span className={"order-user-name"}>
                {authMember?.memberNick}
              </span>
              <span className={"order-user-prof"}>
                {authMember?.memberType}
              </span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
                <LocationOnIcon />
              </div>
              <div className={"spec-address-txt"}>
                {authMember?.memberAddress
                  ? authMember.memberAddress
                  : "Do not exist"}
              </div>
            </Box>
          </Box>
          <Box className={"order-payment-box"}>
            <Stack spacing={1}>
              <TextField
                label="Card Number"
                variant="outlined"
                fullWidth
                inputProps={{ maxLength: 19 }}
              />

              <Stack direction="row" spacing={1}>
                <TextField
                  label="Expiry Date"
                  placeholder="MM/YY"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 5 }}
                />

                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  inputProps={{ maxLength: 3 }}
                />
              </Stack>

              <TextField label="Cardholder Name" variant="outlined" fullWidth />

              <Box className={"user-media-box"}>
                <img src="/icons/western-card.svg" alt="Western Card" />
                <img src="/icons/master-card.svg" alt="Mastercard" />
                <img src="/icons/paypal-card.svg" alt="PayPal" />
                <img src="/icons/visa-card.svg" alt="Visa" />
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
