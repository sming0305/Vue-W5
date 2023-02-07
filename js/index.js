import ProductList from "../components/ProductListComponent.js";
import ProductsInfo from "../components/ProductsInfoCompontnt.js";
import Cart from "../components/CartComponent.js";
import Pagenation from "../components/PagenationComponent.js";
import Order from "../components/OrderComponent.js";

import productStore from "../pinia/productStore.js";

const { createPinia, mapActions } = Pinia;
const pinia = createPinia();

const app = Vue.createApp({
    data() {
        return {
            isLoading: true
        }
    },
    components: {
        ProductList,
        ProductsInfo,
        Cart,
        Pagenation,
        Order
    },
    methods: {
        ...mapActions(productStore, ["getProducts"])
    },
    mounted() {
        this.getProducts()

        setTimeout(() => {
            this.isLoading = false;
        }, 2300)
    }
})

app.component('loading', VueLoading.Component)

app.use(pinia);
app.mount("#app");