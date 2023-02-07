import productStore from "../pinia/productStore.js";
import cartStore from "../pinia/cartStore.js";
const { mapState, mapActions } = Pinia;

export default {
    template: `    
         <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                aria-hidden="true" ref="modal">
                <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
                    <div class="modal-content border-0">
                        <div class="modal-header bg-dark text-white">
                            <h5 class="modal-title" id="exampleModalLabel">
                                <span>{{ currentProduct?.title }}</span>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-6">
                                    <img class="img-fluid" :src="currentProduct?.imageUrl" :alt="currentProduct?.title">
                                </div>
                                <div class="col-sm-6 d-flex flex-column justify-content-between">
                                    <div>
                                      <span class="badge bg-primary rounded-pill mb-2">{{ currentProduct?.category}}</span>
                                      <p>商品描述：{{ currentProduct?.description }}</p>
                                      <p>商品內容：{{ currentProduct?.content }}</p>
                                      <del class="h6">原價 {{ currentProduct?.origin_price }} 元</del>
                                      <div class="h5">現在只要 {{ currentProduct?.price }} 元</div>
                                    </div>
                                    <div class="mb-4">
                                        <div class="input-group">
                                            <input type="number" class="form-control" min="1" ref="number" placeholder="請輸入數量(預設最小值1入)" 
                                            oninput="value=value.replace(/^(0+)|[^\\d]+/g,'')">
                                            <button type="button" class="btn btn-primary" @click="addProduct(currentProduct?.id)" >加入購物車</button>
                                        </div>
                                    </div>
                                </div>
                       
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
    methods: {
        ...mapActions(productStore, ["targetDom"]),
        ...mapActions(cartStore, ["addProduct","targetInput"])

    },
    computed: {
        ...mapState(productStore, ["currentProduct"])
    },
    mounted() {
        const modal = new bootstrap.Modal(this.$refs.modal);
        const number = this.$refs.number
        this.targetDom(modal)
        this.targetInput(number)
    }
}