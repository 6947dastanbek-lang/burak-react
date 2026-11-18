import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi; //local server api pathni olish uchun ishlatdik. Bu bizga backend server bilan ishlash imkonini beradi.localhost:3003
  }

  public async getProducts(input: ProductInquiry): Promise<Product[]> {
    try {
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`; //backend serverga request yuborish uchun url ni yaratdik.
      //  Bu bizga backend server bilan ishlash imkonini beradi.

      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`; //if productCollection bolsa url ga qo'shish uchun ishlatdik

      if (input.search) url += `&search=${input.search}`;

      const result = await axios.get(url); //axiosni get. {data}qilip distruct qilsa ham boladi
      console.log("getProducts:", result);

      return result.data; //data ozini yozsa ham boladi
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }
  public async getProduct(productId: string): Promise<Product> {
    try {
      const url = `${this.path}/product/${productId}`;
      const result = await axios.get(url, { withCredentials: true });
      console.log("getProduct:", result);

      return result.data;
    } catch (err) {
      console.log("Error, getProduct:", err);
      throw err;
    }
  }
}

export default ProductService;
