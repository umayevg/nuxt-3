<script setup>
import { defineProps, defineEmits, ref } from "vue";
import { onClickOutside } from '@vueuse/core'

const props = defineProps({
    isOpen: Boolean,
    storeData: Object
})

const emit = defineEmits(["modal-close"]);

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

</script>

<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container" ref="target">

                <div class="modal-body">
                    <slot name="content">
                        <div v-if="!storeData.products.length">
                            Cart is empty
                        </div>
                        <div v-else>
                            <div v-for="item in storeData.products">
                                <h3 class="product-title">{{ item.title }}</h3>
                                <div style="display: flex; justify-content: space-between;">
                                    <span>{{ item.count }}x ${{ item.price }}</span>
                                    <div>
                                        <button @click="storeData.removeFromCart(item.id)">-</button><button
                                            @click="storeData.addToCart(item)">+</button>
                                    </div>
                                </div>
                            </div>
                            <hr>
                            <p>Total price: <strong>${{ storeData.totalPrice.toFixed(2) }}</strong></p>
                        </div>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    margin-right: 5px;
    padding: 2px 10px;
    cursor: pointer;
}

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-wrapper {
    display: flex;
    justify-content: center;
    padding: 10px;
}


.modal-container {
    max-height: 400px;
    overflow: scroll;
    max-width: 900px;
    margin-top: 10%;
    width: 100%;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
</style>