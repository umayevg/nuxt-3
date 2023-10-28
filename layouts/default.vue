<script setup>
import {useProductStore} from "~/store/productStore";

const store = useProductStore()

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const submitHandler = () => {
  //here you do whatever
}
</script>

<template>
  <header style="display: flex; flex-direction: column; align-items: flex-end">
    <div>
      <button @click="openModal">View cart modal</button>
    </div>
    <Modal :storeData="store" :isOpen="isModalOpened" @modal-close="closeModal" @submit="submitHandler"
           name="first-modal">
      <template #content></template>
    </Modal>
    <p>Total: <strong>${{ store.totalPrice.toFixed(2) }}</strong></p>
  </header>
  <slot></slot>
</template>

<style scoped>
button {
  border: none;
  padding: 10px;
  cursor: pointer;
  transition: all .2s ease-in-out;
}

button:hover {
  background: #ccc;
}
</style>