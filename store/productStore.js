import {defineStore} from "pinia";

export const useProductStore = defineStore('cart', {
    state: () => ({products: [], totalPrice: 0}),
    getters: {
        getCart: (state) => state
    },
    actions: {
        addToCart(product) {
            let findProduct = this.products.find(p => p.id === product.id)
            if (findProduct) {
                findProduct.count++
                this.totalPrice = this.totalPrice + product.price
            } else {
                this.products.push({...product, count: 1})
                this.totalPrice = this.totalPrice + product.price
            }


            console.log(this.products)
        },
        removeFromCart(productId) {
            const findProductIndex = this.products.findIndex(product => product.id === productId);

            if (findProductIndex !== -1) {
                const findProduct = this.products[findProductIndex];

                if (findProduct.count > 1) {
                    findProduct.count--;
                    this.totalPrice = this.totalPrice - findProduct.price;
                } else {
                    // Remove the product from the products array
                    this.products.splice(findProductIndex, 1);
                    this.totalPrice = this.totalPrice - findProduct.price;
                }
            }
        }
    },
})