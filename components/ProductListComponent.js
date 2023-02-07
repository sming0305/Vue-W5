import productStore from "../pinia/productStore.js"
import cartStore from "../pinia/cartStore.js"

const { mapState, mapActions } = Pinia;

export default {
    template: `<table class="table align-middle">
               <thead>
                   <tr>
                       <th>圖片</th>
                       <th>商品名稱</th>
                       <th>價格</th>
                       <th></th>
                   </tr>
               </thead>
               <tbody>
                   <tr v-for="(product,index) in productsList" :key="product.title">
                       <td width="200" >
                            <img :src="product.imageUrl" :alt="product.title" style="height: 60px; object-fit: cover;">
                       </td>
                       <td width="250">
                           {{ product.title }}
                       </td>
                       <td width="200">
                           <del class="h6">原價 {{ product.origin_price }} 元</del>
                           <div class="h5">現在只要 {{ product.price }} 元</div>
                       </td>
                       <td width="300">
                           <div class="btn-group btn-group-sm">

                               <button type="button"  class="btn btn-outline-secondary me-1" @click="function(e){targetProduct(product.id,e)}">
                                   <i class=""></i>
                                   查看更多
                               </button>

                               <button type="button" class="btn btn-outline-danger" @click="function(e){addProduct(product.id,e)}">
                                   <i class=""></i>
                                   加到購物車
                               </button>

                           </div>
                       </td>
                   </tr>
               </tbody>
           </table>`,
    computed: {
        ...mapState(productStore, ["productsList"]),
    },
    methods: {
        ...mapActions(productStore, ["targetProduct"]),
        ...mapActions(cartStore, ["addProduct"])
    }
}