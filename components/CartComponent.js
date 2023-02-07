import cartStore from "../pinia/cartStore.js"
const { mapState, mapActions } = Pinia;

export default {
    template: `<div class="text-end">
                      <button class="btn btn-outline-danger mb-2" type="button" @click="delCartAllProduct()">清空購物車</button>
                  </div>
                  <table class="table align-middle">
                      <thead>
                          <tr>
                              <th></th>
                              <th>品名</th>
                              <th style="width: 150px">數量/單位</th>
                              <th class="text-end">單價</th>
                              <th class="text-end">小計</th>
                          </tr>
                      </thead>
                      <tbody>
                          <template v-if="cart?.carts?.length !== 0">
                              <tr v-for="(product,index) in cart.carts" :key="product.product.title">
                                  <td>
                                      <button type="button" class="btn btn-outline-danger btn-sm" @click="function(e){delProduct(product.id,e)}">
                                          <i class=""></i>
                                          x
                                      </button>
                                  </td>
                                  <td>
                                      {{ product.product.title }}
                                  </td>
                                  <td>
                                      <div class="input-group input-group-sm">
                                          <div class="input-group">
                                              <input min="1" type="number" class="form-control" :disabled="loading" v-model="product.qty" 
                                              @change="function(e){editQty(product.id,product.product_id,e)}" 
                                              oninput="value=value.replace(/^(0+)|[^\\d]+/g,'')"> 
                                              <span class="input-group-text" id="basic-addon2">{{ product.product.unit }}</span>
                                          </div>
                                      </div>
                                  </td>
                                  <td>
                                     <p class="mb-0 text-end"> {{ product.product.price}} 元 </p>
                                  </td>
                                  <td>
                                   <p class="mb-0 text-end"> {{  product.product.price *  product.qty}} 元 </p>
                                  </td>
                              </tr>
                          </template>
                      </tbody>
                      <tfoot>
                          <tr>
                              <td colspan="4" class="text-end">總計</td>
                              <td class="text-end">{{ cart.final_total }} 元</td>
                          </tr>
                      </tfoot>
                  </table>`,
    computed: {
        ...mapState(cartStore, ["cart", "cartTotal", "loading"])
    },
    methods: {
        ...mapActions(cartStore, ["getCartList", "delProduct", "delCartAllProduct", "editQty"])
    },
    mounted() {
        this.getCartList()
    }
}