import React from "react";
import { Link as RouterLink, Route, Switch } from "react-router-dom";
import "../css/app.css";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { RippleBadge } from "./MaterialTheme/styled";
import { HomePage } from "./screens/homePage";
import { ProductsPage } from "./screens/productsPage";
import { OrdersPage } from "./screens/ordersPage";
import { UserPage } from "./screens/userPage";
function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <RouterLink to="/">HomePage</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/products">ProductsPage</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/orders">OrdersPage</RouterLink>
                    </li>
                    <li>
                        <RouterLink to="/member-page">UserPage</RouterLink>
                    </li>
                </ul>
            </nav>

            <Switch>
                <Route path="/products">
                    <ProductsPage />
                </Route>

                <Route path="/orders">
                    <OrdersPage />
                </Route>
                <Route path="/member-page">
                    <UserPage />
                </Route>

                <Route path="/">
                    <HomePage />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
