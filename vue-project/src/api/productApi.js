import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

export default {
  getProducts() {
    return apiClient.get("/products");
  },
  addToCart(product) {
    return apiClient.post("/cart", product);
  },
  getCart() {
    return apiClient.get("/cart");
  },
  updateCartItem(id, product) {
    return apiClient.put(`/cart/${id}`, product);
  },
  deleteCartItem(id) {
    return apiClient.delete(`/cart/${id}`);
  },
};
