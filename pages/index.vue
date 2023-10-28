<script setup>

import { dummyProducts } from './../data/dummyData.js'
import { useProductStore } from "~/store/productStore.js";

let { data: products, pending, status, refresh, execute, error } = useFetch('https://fakestoreapi.com/products')
const store = useProductStore()


if (error.value) {
  console.log('error');
  products = dummyProducts
}


</script>

<template>
  <div class="container">
    <div class="product-card" v-for="product in products" :key="product.id">
      <NuxtLink :to="/products/ + product.id">
        <img v-if="error" class="product-image" src="../images/stairs.jpg" alt="Image name">
        <img v-else class="product-image" :src="product.image" :alt="product.title">
        <div class="product-details">
          <div :title="product.title" class="product-title">{{
            product.title.length > 20 ? product.title.substring(0, 20) +
          '...' : product.title
          }}
          </div>
          <div class="product-price">${{ product.price.toFixed(2) }}</div>
          <button class="btn" @click.prevent.stop="store.addToCart(product)">add</button>
        </div>
      </NuxtLink>
    </div>

  </div>
</template>

<style>
body {
  max-width: 1200px;
  width: 100%;
  font-family: Arial, sans-serif;
  margin: 0 auto;
  padding: 20px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-card {
  width: calc(33.33% - 40px);
  /* 40px is the total horizontal margin and border width combined */
  border: 1px solid #ccc;
  border-radius: 10px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.product-card a {
  text-decoration: none;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: scale-down;
  border-bottom: 1px solid #ccc;
}

.product-details {
  padding: 15px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

.product-price {
  font-size: 16px;
  color: #ff4500;
}

.btn {
  max-width: 200px;
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #75c578;
}

@media (max-width: 910px) {
  .product-card {
    margin-left: 0;
    margin-right: 0;
    width: calc(50% - 40px);
    /* 40px is the total horizontal margin and border width combined */
  }

  .product-title {
    font-size: 14px;
  }

  body {
    padding: 0;
  }
}
</style>