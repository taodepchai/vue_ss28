import { createStore } from "vuex";
import products from "../store/modules/product";

export default createStore({
  modules: {
    products,
  },
});
