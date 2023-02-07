import { apiUrl, apiPath } from "../js/config.js"
const { defineStore } = Pinia

export default defineStore("productStore", {
    state: () => ({
        productsList: [],
        currentProduct: {},
        modal: {},
        pagination: {}
    }),
    actions: {
        getProducts(targetPage) {
            axios.get(`${apiUrl}api/${apiPath}/products?page=${targetPage}`)
                .then(res => {
                    this.productsList = res.data.products
                    this.pagination = res.data.pagination
                }).catch(err => {
                    alert(err.data.message)
                })
        },
        targetProduct(productId, e) {

            this.currentProduct = {};
            e.target.children[0].className = "fas fa-spinner fa-pulse"

            setTimeout(() => {
                axios.get(`${apiUrl}api/${apiPath}/product/${productId}`)
                    .then(res => {
                        this.currentProduct = res.data.product
                        this.modal.show();
                        e.target.children[0].className = ""
                    }).catch(err => {
                        alert(err.data.message)
                        e.target.children[0].className = ""
                    })
            }, 300)
        },
        targetDom(target) {
            this.modal = target;
        }
    }
})