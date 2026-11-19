import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Badge,
  Pagination,
  PaginationItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setProducts } from "./slice";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { ProductCollection } from "../../../lib/enums/product.enum";
import ProductService from "../../services/ProductService";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";
import { log } from "console";
/** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));
interface ProductsProps {
  onAdd: (item: CartItem) => void;
}
const brands = [
  { name: "Burak Gurme", imagePath: "/img/gurme.webp" },
  { name: "Burak Seafood", imagePath: "/img/seafood.webp" },
  { name: "Burak Sweets", imagePath: "/img/sweets.webp" },
  { name: "Burak Doner", imagePath: "/img/doner.webp" },
];
export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.DISH,
    search: "",
  });
  const [searchText, setSearchText] = useState<string>(""); // input qiymatini saqlash
  const history = useHistory(); //router orqali boshqa sahifaga otish
  /** BACKEND DATA FETCH */
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => {
        console.log("data passed here:", data);
        setProducts(data);
      })
      .catch((err) => console.log(err));
  }, [productSearch]);

  /** SEARCH TEXT */
  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]);
  /** HANDLERS */
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;

    setProductSearch({ ...productSearch });
  };

  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1;
    productSearch.productCollection = collection;

    setProductSearch({ ...productSearch });
  };

  const searchProductHandler = () => {
    productSearch.page = 1;
    productSearch.search = searchText;

    setProductSearch({ ...productSearch });
  };

  const paginationHandler = (e: React.ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  };
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  };
  return (
    <div className="products-page">
      <div className="products">
        <Container>
          <Stack flexDirection="column" alignItems="center" width="100%">
            {/* RESTAURANT HEADER & SEARCH */}
            <Stack className="avatar-big-box">
              <Box className="top-text">
                <p>Burak Restaurant</p>
              </Box>
              <Stack className="single-search-big-box">
                <input
                  type="search"
                  className="single-search-input"
                  name="singleResearch"
                  placeholder="Type here"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    //agar enter bosilsa yoki search bosilsa
                    if (e.key === "Enter") {
                      searchProductHandler();
                    }
                  }}
                />
                <Button
                  className="single-button-search"
                  variant="contained"
                  endIcon={<SearchIcon />}
                  onClick={searchProductHandler}
                >
                  Search
                </Button>
              </Stack>
            </Stack>
            {/* SORT SECTION */}
            <Stack className="dishes-filter-section">
              <Stack className="dishes-filter-box">
                <Button
                  variant="contained"
                  className="order"
                  color={
                    productSearch.order === "createdAt"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("createdAt")}
                >
                  NEW
                </Button>
                <Button
                  variant="contained"
                  className="order"
                  color={
                    productSearch.order === "productPrice"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productPrice")}
                >
                  PRICE
                </Button>
                <Button
                  variant="contained"
                  className="order"
                  color={
                    productSearch.order === "productViews"
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() => searchOrderHandler("productViews")}
                >
                  VIEWS
                </Button>
              </Stack>
            </Stack>
            {/* CATEGORY & PRODUCT SECTION */}
            <Stack direction="row" className="list-category-section">
              <Stack className="category-navigation">
                {/* DISH */}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  DISH
                </Button>
                {/* SALAD */}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  SALAD
                </Button>
                {/* DRINK */}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  DRINK
                </Button>
                {/* DESSERT */}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  DESSERT
                </Button>
                {/* OTHER */}
                <Button
                  variant="contained"
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  OTHER
                </Button>
              </Stack>
              {/* PRODUCT CARDS */}
              <Stack className="product-wrapper">
                {products.length !== 0 ? (
                  products.map((product: Product) => {
                    const imagePath = `${serverApi}/${product.productImages[0]}`;
                    const sizeVolume =
                      product.productCollection === ProductCollection.DRINK
                        ? product.productVolume + " litre"
                        : product.productSize + " size";
                    return (
                      <Stack
                        key={product._id}
                        className={"product-card"}
                        onClick={() => chooseDishHandler(product._id)}
                      >
                        <Stack
                          className={"product-img"}
                          sx={{
                            backgroundImage: `url(${imagePath})`,
                          }}
                        >
                          <div className={"product-sale"}>{sizeVolume}</div>
                          <Button
                            className={"shop-btn"}
                            onClick={(e) => {
                              onAdd({
                                _id: product._id,
                                quantity: 1,
                                name: product.productName,
                                price: product.productPrice,
                                image: product.productImages[0],
                              });

                              e.stopPropagation();
                            }}
                          >
                            <img
                              src="/icons/shopping-cart.svg"
                              style={{ display: "flex" }}
                              alt="Shopping cart"
                            />
                          </Button>
                          <Button className="view-btn" sx={{ right: "36px" }}>
                            <Badge
                              badgeContent={product.productViews}
                              color="secondary"
                            >
                              <RemoveRedEyeIcon
                                sx={{
                                  color:
                                    product.productViews === 0
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
                            {product.productPrice}
                          </div>
                        </Box>
                      </Stack>
                    );
                  })
                ) : (
                  <Box className="no-data">Products are not available!</Box>
                )}
              </Stack>
            </Stack>
            {/* PAGINATION */}
            <Stack className="pagination-section">
              <Pagination
                count={
                  products.length !== 0
                    ? productSearch.page + 1
                    : productSearch.page
                }
                page={productSearch.page}
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
                onChange={paginationHandler}
              />
            </Stack>
          </Stack>
        </Container>
      </div>
      {/* BRANDS SECTION */}
      <div className="brands-logo">
        <Container>
          <Stack className="brands-content">
            <Box className="title">Our Family Brands</Box>
            <Box className="brands-wrapper">
              {brands.map((brand) => (
                <Box className="brand-card" key={brand.name}>
                  <img src={brand.imagePath} alt={brand.name} />
                </Box>
              ))}
            </Box>
          </Stack>
        </Container>
      </div>
      {/* ADDRESS SECTION */}
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
