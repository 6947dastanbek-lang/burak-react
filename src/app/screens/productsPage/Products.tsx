import React, { useState } from "react";
import {
    Box,
    Button,
    Container,
    Stack,
    Badge,
    Pagination,
    PaginationItem,
    TextField,
    InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const products = [
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
    { productName: "Lavash", imagePath: "/img/lavash.webp" },
    { productName: "Cutlet", imagePath: "/img/cutlet.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
    { productName: "Kebab", imagePath: "/img/kebab-fresh.webp" },
    { productName: "Kebab", imagePath: "/img/kebab.webp" },
];

const brands = [
    { name: "Burak Gurme", imagePath: "/img/gurme.webp" },
    { name: "Burak Seafood", imagePath: "/img/seafood.webp" },
    { name: "Burak Sweets", imagePath: "/img/sweets.webp" },
    { name: "Burak Doner", imagePath: "/img/doner.webp" },
];

const categories = ["DISH", "SALAD", "DRINK", "DESSERT", "OTHER"];

export default function Products() {
    const [searchText, setSearchText] = useState("");
    const [sortBy, setSortBy] = useState("NEW");
    const [activeCategory, setActiveCategory] = useState("DISH");
    const [page, setPage] = useState(1);

    const filteredProducts = products
        .filter((product) =>
            product.productName
                .toLowerCase()
                .includes(searchText.toLowerCase()),
        )
        .slice()
        .sort((a, b) => {
            if (sortBy === "PRICE") return 0;
            if (sortBy === "VIEWS") return 0;
            return 0;
        });

    const productsPerPage = 12;
    const startIndex = (page - 1) * productsPerPage;
    const visibleProducts = filteredProducts.slice(
        startIndex,
        startIndex + productsPerPage,
    );

    return (
        <div className="products-page">
            <div className="products">
                <Container>
                    <Stack
                        flexDirection="column"
                        alignItems="center"
                        width="100%"
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                            className="restaurant-header"
                        >
                            <Stack className="avatar-big-box">
                                <Box className="top-text">
                                    <span> Burak Restaurant</span>
                                </Box>
                            </Stack>
                            <Box className="restaurant-search">
                                <TextField
                                    size="small"
                                    placeholder="Type here"
                                    value={searchText}
                                    onChange={(event) => {
                                        setSearchText(event.target.value);
                                        setPage(1);
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Button
                                                    className="search-btn"
                                                    onClick={() => setPage(1)}
                                                    endIcon={<SearchIcon />}
                                                >
                                                    SEARCH
                                                </Button>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        </Stack>

                        <Stack className="dishes-filter-section">
                            <Stack className="dishes-filter-box">
                                {["NEW", "PRICE", "VIEWS"].map((sort) => (
                                    <Button
                                        key={sort}
                                        className="order"
                                        variant={
                                            sortBy === sort
                                                ? "contained"
                                                : "outlined"
                                        }
                                        color={
                                            sort === "NEW"
                                                ? "primary"
                                                : "secondary"
                                        }
                                        onClick={() => {
                                            setSortBy(sort);
                                            setPage(1);
                                        }}
                                    >
                                        {sort}
                                    </Button>
                                ))}
                            </Stack>
                        </Stack>

                        <Stack
                            direction="row"
                            className="list-category-section"
                        >
                            <Stack className="category-navigation">
                                {categories.map((category) => (
                                    <Button
                                        key={category}
                                        className={
                                            activeCategory === category
                                                ? "active"
                                                : ""
                                        }
                                        onClick={() => {
                                            setActiveCategory(category);
                                            setPage(1);
                                        }}
                                    >
                                        {category}
                                    </Button>
                                ))}
                            </Stack>

                            <Stack className="product-wrapper">
                                {visibleProducts.length !== 0 ? (
                                    visibleProducts.map((product, index) => (
                                        <Stack
                                            key={index}
                                            className="product-card"
                                        >
                                            <Stack
                                                className="product-img"
                                                sx={{
                                                    backgroundImage: `url(${product.imagePath})`,
                                                }}
                                            >
                                                <div className="product-sale">
                                                    Normal size
                                                </div>

                                                <Button className="shop-btn">
                                                    <img
                                                        src="/icons/shopping-cart.svg"
                                                        style={{
                                                            display: "flex",
                                                        }}
                                                        alt="Shopping cart"
                                                    />
                                                </Button>

                                                <Button
                                                    className="view-btn"
                                                    sx={{ right: "36px" }}
                                                >
                                                    <Badge
                                                        badgeContent={20}
                                                        color="secondary"
                                                    >
                                                        <RemoveRedEyeIcon
                                                            sx={{
                                                                color: 20
                                                                    ? "gray"
                                                                    : "white",
                                                            }}
                                                        />
                                                    </Badge>
                                                </Button>
                                            </Stack>

                                            <Box className="product-desc">
                                                <span className="product-title">
                                                    {product.productName}
                                                </span>

                                                <div className="product-desc">
                                                    <MonetizationOnIcon />
                                                    {12}
                                                </div>
                                            </Box>
                                        </Stack>
                                    ))
                                ) : (
                                    <Box className="no-data">
                                        Products are not available!
                                    </Box>
                                )}
                            </Stack>
                        </Stack>
                        <Stack className="pagination-section">
                            <Pagination
                                count={3}
                                page={page}
                                onChange={(_, value) => setPage(value)}
                                renderItem={(item) => (
                                    <PaginationItem
                                        components={{
                                            previous: ArrowBackIcon,
                                            next: ArrowForwardIcon,
                                        }}
                                        {...item}
                                        color="secondary"
                                    />
                                )}
                            />
                        </Stack>
                    </Stack>
                </Container>
            </div>

            <div className="brands-logo">
                <Container>
                    <Stack className="brands-content">
                        <Box className="title">Our Family Brands</Box>

                        <Box className="brands-wrapper">
                            {brands.map((brand) => (
                                <Box className="brand-card" key={brand.name}>
                                    <img
                                        src={brand.imagePath}
                                        alt={brand.name}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Stack>
                </Container>
            </div>

            <div className="address">
                <Container>
                    <Stack className="address-area">
                        <Box className="title">Our address</Box>
                        <iframe
                            title="Busan KTX Station map"
                            src="https://maps.google.com/maps?q=Busan%20Station%2C%20206%20Jungang-daero%2C%20Dong-gu%2C%20Busan%2C%20South%20Korea&output=embed"
                            width="100%"
                            height="450"
                            style={{
                                border: 0,
                                marginTop: "40px",
                                borderRadius: "12px",
                            }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </Stack>
                </Container>
            </div>
        </div>
    );
}
