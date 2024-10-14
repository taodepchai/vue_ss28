<template>
  <div class="product-list">
    <h2>Products</h2>
    <div v-for="product in products" :key="product.id" class="product-item">
      <img :src="product.image" :alt="product.name" class="product-image" />
      
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }} </p>
      <p>Price: ${{ product.price }}</p>
      <button @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const products = computed(() => store.getters.allProducts);

const addToCart = (product) => {
  store.dispatch("addToCart", product);
};

store.dispatch("fetchProducts");
</script>

<style scoped>
.product-item {
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 200px;
  height: auto;
  margin-bottom: 15px;
}
</style>
