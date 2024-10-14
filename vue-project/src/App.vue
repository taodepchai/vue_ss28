<template>
  <div style="display: flex;">
    <ProductList style="width: 50%;"></ProductList>
    <Cart></Cart>
  </div>
</template>

<script setup>
  import ProductList from "./components/manager/ProductList.vue"
  import Cart from "./components/manager/Cart.vue"
</script>

<style>

</style>