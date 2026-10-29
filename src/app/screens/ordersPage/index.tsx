import React, { useState, SyntheticEvent } from "react";
import { Container, Stack, Box, TextField } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel"; // YANGI
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";

export default function OrdersPage() {
    const [value, setValue] = useState("1");

    const handleChange = (e: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <div className={"order-page"}>
            <Container className="order-container">
                <Stack className={"order-left"}>
                    <TabContext value={value}>
                        <Box className={"order-nav-frame"}>
                            <Box
                                sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
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
                            <PausedOrders />
                            <ProcessOrders />
                            <FinishedOrders />
                        </Stack>
                    </TabContext>
                </Stack>

                <Stack className={"order-right"}>
                    <Box className={"order-info-box"}>
                        <Box className={"member-box"}>
                            <div className={"order-user-img"}>
                                <img
                                    src={"/icons/default-user.svg"}
                                    className={"order-user-avatar"}
                                />
                                <div className={"order-user-icon-box"}>
                                    <img
                                        src={"/icons/user-badge.svg"}
                                        className={"order-user-prof-img"}
                                    />
                                </div>
                            </div>
                            <span className={"order-user-name"}>Danny</span>
                            <span className={"order-user-prof"}>User</span>
                        </Box>
                        <Box className={"liner"}></Box>
                        <Box className={"order-user-address"}>
                            <div style={{ display: "flex" }}>
                                <LocationOnIcon />
                            </div>
                            {/* YANGI: manzil matni */}
                            <p
                                className={"user-desc"}
                                style={{ margin: 0, marginLeft: "6px" }}
                            >
                                South Korea, Busan
                            </p>
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

                            <TextField
                                label="Cardholder Name"
                                variant="outlined"
                                fullWidth
                            />

                            <Box className={"user-media-box"}>
                                <img
                                    src="/icons/western-card.svg"
                                    alt="Western Card"
                                />
                                <img
                                    src="/icons/master-card.svg"
                                    alt="Mastercard"
                                />
                                <img
                                    src="/icons/paypal-card.svg"
                                    alt="PayPal"
                                />
                                <img src="/icons/visa-card.svg" alt="Visa" />
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Container>
        </div>
    );
}
