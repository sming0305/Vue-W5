import { apiUrl, apiPath } from "../js/config.js"
import productStore from "./productStore.js"
const { defineStore } = Pinia

export default defineStore("cartStore", {
    state: () => ({
        cart: {},
        input: {},
        loading: false
    }),
    actions: {
        getCartList() {
            axios.get(`${apiUrl}api/${apiPath}/cart`)
                .then(res => {
                    this.cart = res.data.data
                }).catch(err => {
                    alert(err.data.message)
                })
        },
        addProduct(productId, e) {
            const { modal } = productStore();

            let qty = 1;

            if (modal._backdrop) {
                if (this.input.value > 0) {
                    qty = this.input.value * 1;
                } else {
                    qty = 1;
                }
            }

            if (e?.target?.innerText === "加到購物車") {
                e.target.children[0].className = "fas fa-spinner fa-pulse";
                setTimeout(() => {
                    e.target.children[0].className = ""
                }, 600)
            }

            axios.post(`${apiUrl}api/${apiPath}/cart`, { "data": { "product_id": productId, "qty": qty } })
                .then(res => {
                    alert(res.data.message)
                    this.getCartList();
                }).catch(err => {
                    alert(err.data.message)
                })

            this.input.value = "";
            modal.hide();
        },
        editQty(id, productId, e) {

            const qty = e.target.value * 1;

            this.loading = true;

            axios.put(`${apiUrl}api/${apiPath}/cart/${id}`, { "data": { "product_id": productId, "qty": qty } })
                .then(res => {
                    this.getCartList();
                    this.loading = false;
                    alert(res.data.message)
                }).catch(err => {
                    this.loading = false;
                    alert(err.data.message)
                })
        },
        delProduct(productId, e) {
            e.target.children[0].className = "fas fa-spinner fa-pulse"
            axios.delete(`${apiUrl}api/${apiPath}/cart/${productId}`)
                .then(res => {
                    alert(res.data.message)
                    this.getCartList();
                    e.target.children[0].className = ""
                }).catch(err => {
                    e.target.children[0].className = ""
                    alert(err.data.message)
                })
        },
        delCartAllProduct() {
            axios.delete(`${apiUrl}api/${apiPath}/carts`)
                .then(res => {
                    alert(`購物車${res.data.message}`)
                    this.getCartList();
                }).catch(err => {
                    alert(err.data.message)
                })
        },
        targetInput(input) {
            this.input = input;
        }
    }
})