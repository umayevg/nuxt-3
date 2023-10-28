<script setup>
import { dummyProducts } from "~/data/dummyData";
import { useCartStore } from "~/store/postStore";


const routeData = useRoute()
const store = useCartStore()
let { data: product, pending, error } = await useFetch('https://fakestoreapi.com/products/' + routeData.params.id)

if (error.value) {
  product = dummyProducts[0]
}

</script>

<template>
  <div v-if="pending">
    Data loading...
  </div>
  <div v-else>

    <div class="product-container">
      <img v-if="error" class="product-image" src="../../images/stairs.jpg" alt="Product">
      <img v-else class="product-image" :src="product.image" alt="Product">
      <div class="product-title">{{ product.title }}</div>
      <div class="product-price">${{ Number.parseInt(product.price).toFixed(2) }}</div>
      <div class="product-description">
        {{ product.description }}
      </div>
      <button @click="store.addToCart(product)" class="add-to-cart-button">Add to Cart</button>
    </div>
  </div>
</template>

<style scoped>
button {
  margin-right: 15px !important;
}

/* Style for the product title */
.product-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 15px;
}

/* Style for the product price */
.product-price {
  font-size: 20px;
  color: #ff4500;
  margin-bottom: 15px;
}


.add-to-cart-button {
  background-color: #4caf50;
  padding: 15px 30px;
  border: none;
  font-size: 18px;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart-button:hover {
  background-color: #45a049;
}


.product-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  max-width: 100%;
  height: 400px;
  margin-bottom: 20px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.product-description {
  font-size: 18px;
  margin-bottom: 30px;
  text-align: justify;
  color: #555;
  line-height: 1.6;
}

</style>