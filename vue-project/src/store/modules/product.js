import productApi from "../../api/productApi";

const product = {
  state: {
    products: [],
    cart: [],
  },
  getters: {
    allProducts: (state) => state.products,
    cartItems: (state) => state.cart,
    cartTotal: (state) => {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await productApi.getProducts();
        commit("setProducts", response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    async addToCart({ commit, state }, product) {
      const existingItem = state.cart.find((item) => item.id === product.id);

      if (existingItem) {
        const updatedItem = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
        };
        await productApi.updateCartItem(existingItem.id, updatedItem);
        commit("updateCartItem", updatedItem);
      } else {
        const newItem = { ...product, quantity: 1 };
        const response = await productApi.addToCart(newItem);
        commit("addCartItem", response.data);
      }
    },
    async fetchCart({ commit }) {
      try {
        const response = await productApi.getCart();
        commit("setCart", response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    },
    async updateCartItem({ commit }, { id, product }) {
      try {
        await productApi.updateCartItem(id, product);
        commit("updateCartItem", { id, product });
      } catch (error) {
        console.error("Error updating cart item:", error);
      }
    },
    async deleteCartItem({ commit }, id) {
      try {
        await productApi.deleteCartItem(id);
        commit("removeCartItem", id);
      } catch (error) {
        console.error("Error removing cart item:", error);
      }
    },
  },
  mutations: {
    setProducts: (state, products) => (state.products = products),
    setCart: (state, cart) => (state.cart = cart),
    addCartItem: (state, cartItem) => state.cart.push(cartItem),
    updateCartItem: (state, updatedItem) => {
      const index = state.cart.findIndex((item) => item.id === updatedItem.id);
      if (index !== -1) {
        state.cart.splice(index, 1, updatedItem);
      }
    },
    removeCartItem: (state, id) => {
      state.cart = state.cart.filter((item) => item.id !== id);
    },
  },
};

export default product;
